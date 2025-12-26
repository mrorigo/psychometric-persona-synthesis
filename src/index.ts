import { Command } from "commander";
import { PersonaGenerator } from "./lib/PersonaGenerator.ts";
import { BFI2_ITEMS } from "./data/bfi2_items.ts";
import { OCCUPATIONAL_ROLES, BIG_FIVE_CORRELATIONS, DOMAIN_ORDER } from "./data/occupations.ts";
import { cholesky, sampleMultivariateNormal } from "./lib/math.ts";
import type { BFI2Score, RoleMetadata, Domain, FilterLevel } from "./lib/types.ts";




import { writeFile } from "fs/promises";

const program = new Command();

program
    .name("psychometric-personas")
    .description("Generate AI personas using the BFI-2-Expanded method")
    .version("1.0.0");



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

program
    .option("-r, --random", "Generate random personality scores")
    .option("-s, --scores <json>", "JSON string of scores (e.g., '{\"1\":5}')")
    .option("-o, --out <path>", "Output file path")
    .option("-f, --filter [level]", "Filter level (none, strong, extreme)")
    .option("-p, --perspective <type>", "Grammatical perspective (first, second, third)", "second")
    .option("-l, --role <name>", "Occupational role (General Manager, Medical Doctor, Software Developer, Nurse, Artist, Teacher, Entrepreneur, Police Officer, etc.)")

    .action(async (options) => {
        let scores: BFI2Score = {};
        let role: RoleMetadata | undefined;

        let filterLevel: FilterLevel = "none";
        if (options.filter === true) filterLevel = "extreme";
        else if (options.filter) filterLevel = options.filter as FilterLevel;


        if (options.role) {
            role = OCCUPATIONAL_ROLES[options.role];
            if (!role) {
                console.warn(`Role ${options.role} not found. using base population means.`);
            }
        }

        if (options.random) {
            scores = generateHierarchicalScores(role);
            console.log(role ? `Generated hierarchical scores for ${options.role}.` : "Generated hierarchical scores.");

        } else if (options.scores) {
            try {
                scores = JSON.parse(options.scores);
            } catch (error) {
                console.error("Error parsing JSON scores:", error);
                process.exit(1);
            }
        } else {
            console.log("No options provided. Using default example scores.");
            scores = {
                1: 5, 2: 5, 3: 2, 8: 4, 31: 1, 60: 1
            };
        }

        const generator = new PersonaGenerator(getContext(options.perspective));

        let education: string | undefined;
        if (role) {
            education = Math.random() < role.education.tertiaryProbability
                ? role.education.label
                : "Secondary Education";
        }

        const prompt = generator.generateExpandedPersona(scores, {
            filterLevel: filterLevel,
            perspective: options.perspective as any,
            roleName: options.role,
            roleValues: role?.typicalValues,
            education: education
        });






        if (options.out) {
            try {
                await writeFile(options.out, prompt, "utf-8");
                console.log(`Persona saved to ${options.out}`);
            } catch (err) {
                console.error(`Failed to write to file: ${err}`);
            }
        } else {
            console.log(prompt);
        }
    });

program.parse();

function generateHierarchicalScores(role?: RoleMetadata): BFI2Score {
    const mu = DOMAIN_ORDER.map(d => {
        let mean = 3.0;
        if (role) {
            mean += role.offsets[d] || 0;
        }
        return mean;
    });

    const L = cholesky(BIG_FIVE_CORRELATIONS);
    const traitSamples = sampleMultivariateNormal(mu, L);

    const domainScores: Record<string, number> = {};
    DOMAIN_ORDER.forEach((d, i) => {
        domainScores[d] = Math.max(1, Math.min(5, Math.round(traitSamples[i] || 3)));
    });

    const scores: BFI2Score = {};
    for (const item of BFI2_ITEMS) {
        const base = domainScores[item.domain] || 3;
        const noise = Math.floor(Math.random() * 3) - 1;
        let score = base + noise;

        score = Math.max(1, Math.min(5, score));

        if (item.isReverse) {
            score = 6 - score;
        }

        scores[item.id] = score;
    }
    return scores;
}