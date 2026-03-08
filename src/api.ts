import { PersonaGenerator } from "./lib/PersonaGenerator.ts";
import { BFI2_ITEMS } from "./data/bfi2_items.ts";
import { OCCUPATIONAL_ROLES, BIG_FIVE_CORRELATIONS, DOMAIN_ORDER } from "./data/occupations.ts";
import { cholesky, sampleMultivariateNormal, mulberry32 } from "./lib/math.ts";
import type { BFI2Score, RoleMetadata, FilterLevel } from "./lib/types.ts";

export interface PersonaConfig {
    seed?: number;
    roleName?: string;
    filterLevel?: FilterLevel;
    perspective?: "first" | "second" | "third";
}

export interface PersonaGenerationResult {
    promptBody: string;
    scores: Record<string, number>;
    seed: number;
    decisionStyle: string;
}

function getContext(perspective: string): string {
    const base = "### Context ###\n";
    if (perspective === "first") {
        return base + "I am an AI agent participating in a personality psychology study. I have been assigned the following personality traits to simulate during this session.\n";
    } else if (perspective === "second") {
        return base + "You are an AI agent participating in a personality psychology study. You have been assigned the following personality traits to simulate during this session.\n";
    } else {
        return base + "The following describes an AI agent participating in a personality psychology study. The agent has been assigned these traits to simulate.\n";
    }
}

export function generateHierarchicalScores(role: RoleMetadata | undefined, random: () => number): [BFI2Score, Record<string, number>] {
    const mu = DOMAIN_ORDER.map(d => {
        let mean = 3.0;
        if (role) {
            mean += role.offsets[d] || 0;
        }
        return mean;
    });

    const L = cholesky(BIG_FIVE_CORRELATIONS);
    const traitSamples = sampleMultivariateNormal(mu, L, random);

    const domainScores: Record<string, number> = {};
    DOMAIN_ORDER.forEach((d, i) => {
        domainScores[d] = Math.max(1, Math.min(5, Math.round(traitSamples[i] || 3)));
    });

    const scores: BFI2Score = {};
    for (const item of BFI2_ITEMS) {
        const base = domainScores[item.domain] || 3;
        const noise = Math.floor(random() * 3) - 1;
        let score = base + noise;

        score = Math.max(1, Math.min(5, score));

        if (item.isReverse) {
            score = 6 - score;
        }

        scores[item.id] = score;
    }
    return [scores, domainScores];
}

export function inferDecisionStyle(domainScores: Record<string, number>): string {
    const N = domainScores['Neuroticism'] || 3;
    const E = domainScores['Extraversion'] || 3;
    const O = domainScores['Openness'] || 3;
    const A = domainScores['Agreeableness'] || 3;
    const C = domainScores['Conscientiousness'] || 3;

    if (E > 3.5 && N < 2.5) return "FAST";
    if (C > 3.8 && N < 2.5) return "DELIBERATE";
    if (A > 3.5 && E > 3.0) return "CONSENSUS";
    if (A < 2.5 && O > 3.5) return "CONTRARIAN";
    if (O > 4.0 && C < 3.0) return "EXPLORATORY";
    return "BALANCED";
}

export async function generatePersona(config: PersonaConfig): Promise<PersonaGenerationResult> {
    const seed = config.seed ?? Date.now();
    const rng = mulberry32(seed);

    let role: RoleMetadata | undefined;
    if (config.roleName) {
        role = OCCUPATIONAL_ROLES[config.roleName];
    }

    const [scores, domainScores] = generateHierarchicalScores(role, rng);
    const decisionStyle = inferDecisionStyle(domainScores);

    const perspective = config.perspective || "second";
    const filterLevel = config.filterLevel || "none";

    const generator = new PersonaGenerator(getContext(perspective));

    let education: string | undefined;
    if (role) {
        education = rng() < role.education.tertiaryProbability
            ? role.education.label
            : "Secondary Education";
    }

    const promptBody = generator.generateExpandedPersona(scores, {
        filterLevel: filterLevel,
        perspective: perspective,
        roleName: config.roleName,
        roleValues: role?.typicalValues,
        education: education
    });

    return {
        promptBody,
        scores: domainScores,
        seed,
        decisionStyle
    };
}
