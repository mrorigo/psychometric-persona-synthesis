import { INTENSITY_MAP, BFI2_ITEM_MAP } from "../data/bfi2_items.ts";
import type { BFI2Score, Domain, Perspective, FilterLevel } from "./types.ts";


export class PersonaGenerator {
    private starters: Record<Perspective, string[]> = {
        first: [
            "I am",
            "I'm",
            "I tend to be",
            "I consider myself",
            "People generally describe me as",
            "I'm someone who is",
        ],
        second: [
            "You are",
            "You're",
            "You tend to be",
            "You consider yourself",
            "People generally describe you as",
            "You're someone who is",
        ],
        third: [
            "The persona is",
            "They are",
            "They tend to be",
            "They consider themselves",
            "People generally describe them as",
            "They're someone who is",
        ]
    };

    constructor(private contextBlock: string) { }

    private getRandomOpener(perspective: Perspective): string {
        const openers = this.starters[perspective];
        return openers[Math.floor(Math.random() * openers.length)] || (perspective === 'first' ? "I am" : perspective === 'second' ? "You are" : "They are");
    }

    /**
     * Constructs the persona by mapping numeric scores to natural language.
     * Groups by domain and filters for descriptive quality.
     */
    public generateExpandedPersona(
        itemScores: BFI2Score,
        options: {
            filterLevel?: FilterLevel;
            perspective?: Perspective;
            roleName?: string;
            roleValues?: string[];
            education?: string;
        } = {}
    ): string {
        const perspective = options.perspective || "second";
        const filterLevel = options.filterLevel || "none";
        const domains: Record<Domain, { intensity: string, description: string }[]> = {
            Extraversion: [],
            Agreeableness: [],
            Conscientiousness: [],
            Neuroticism: [],
            Openness: [],
        };


        for (const [itemIdStr, inputScore] of Object.entries(itemScores)) {
            const itemId = Number(itemIdStr);
            const item = BFI2_ITEM_MAP[itemId];
            if (!item) continue;

            if (filterLevel === "extreme" && inputScore > 1 && inputScore < 5) {
                continue;
            }
            if (filterLevel === "strong" && inputScore === 3) {
                continue;
            }


            const intensity = INTENSITY_MAP[inputScore] || "sometimes";
            const description = this.fixGrammar(item.description, perspective);
            domains[item.domain].push({ intensity, description });
        }

        let personalitySegment = "";

        if (options.roleName) {
            personalitySegment += `### Role: ${options.roleName} ###\n`;
            if (perspective === 'first') {
                personalitySegment += `My professional background is in this field. `;
                if (options.education) personalitySegment += `I have attained ${options.education}. `;
            } else if (perspective === 'second') {
                personalitySegment += `Your professional background is in this field. `;
                if (options.education) personalitySegment += `You have attained ${options.education}. `;
            } else {
                personalitySegment += `The persona's professional background is in this field. `;
                if (options.education) personalitySegment += `They have attained ${options.education}. `;
            }


            if (options.roleValues && options.roleValues.length > 0) {
                const valueList = options.roleValues.join(", ");
                if (perspective === 'first') {
                    personalitySegment += `I strongly value ${valueList}.\n\n`;
                } else if (perspective === 'second') {
                    personalitySegment += `You strongly value ${valueList}.\n\n`;
                } else {
                    personalitySegment += `They strongly value ${valueList}.\n\n`;
                }
            } else {
                personalitySegment += "\n\n";
            }
        }

        personalitySegment += "### Personality Traits ###\n";

        for (const [domain, traits] of Object.entries(domains)) {
            if (traits.length === 0) continue;

            personalitySegment += `\n**${domain}**\n`;

            // Group traits by intensity to combine them naturally
            const intensityGroups: Record<string, string[]> = {};
            for (const t of traits) {
                const group = intensityGroups[t.intensity] ?? [];
                group.push(t.description);
                intensityGroups[t.intensity] = group;
            }

            const domainSentences: string[] = [];
            for (const [intensity, descs] of Object.entries(intensityGroups)) {
                // Split long lists into chunks of max 4 to maintain readability
                const chunks: string[][] = [];
                for (let i = 0; i < descs.length; i += 4) {
                    chunks.push(descs.slice(i, i + 4));
                }

                chunks.forEach((chunk) => {
                    const opener = this.getRandomOpener(perspective);
                    if (chunk.length === 1) {
                        domainSentences.push(`${opener} ${intensity} ${chunk[0]}.`);
                    } else if (chunk.length === 2) {
                        domainSentences.push(`${opener} ${intensity} ${chunk[0]} and ${chunk[1]}.`);
                    } else {
                        const list = chunk.slice(0, -1).join(", ") + ", and " + chunk[chunk.length - 1];
                        domainSentences.push(`${opener} ${intensity} ${list}.`);
                    }
                });
            }

            personalitySegment += domainSentences.join(" ") + "\n";

        }

        return this.contextBlock + "\n" + personalitySegment;
    }


    private fixGrammar(description: string, perspective: Perspective): string {
        if (perspective === 'first') return description;
        if (perspective === 'second') {
            return description.replace(/myself/g, "yourself").replace(/my /g, "your ");
        }
        return description
            .replace(/myself/g, "themselves")
            .replace(/yourself/g, "themselves")
            .replace(/your /g, "their ")
            .replace(/my /g, "their ");
    }

}


