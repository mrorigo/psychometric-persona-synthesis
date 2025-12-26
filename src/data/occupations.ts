import type { Domain, RoleMetadata } from "../lib/types.ts";

/**
 * Meta-analytic Big Five intercorrelation matrix.
 * Used for multivariate normal sampling of base population traits.
 * Order: [Neuroticism, Extraversion, Openness, Agreeableness, Conscientiousness]
 */
export const BIG_FIVE_CORRELATIONS: number[][] = [
    [1.000, -0.200, -0.100, -0.100, -0.150],
    [-0.200, 1.000, 0.150, 0.150, 0.250],
    [-0.100, 0.150, 1.000, 0.100, 0.200],
    [-0.100, 0.150, 0.100, 1.000, 0.150],
    [-0.150, 0.250, 0.200, 0.150, 1.000],
];

export const DOMAIN_ORDER: Domain[] = [
    'Neuroticism',
    'Extraversion',
    'Openness',
    'Agreeableness',
    'Conscientiousness'
];

/**
 * Refined occupational offsets (Δμ in SD units) based on research2.md.
 */
export const OCCUPATIONAL_ROLES: Record<string, RoleMetadata> = {
    "General Manager": {
        group: "Manager",
        offsets: {
            Neuroticism: -0.25,
            Extraversion: 0.25,
            Openness: 0.20,
            Agreeableness: 0.05,
            Conscientiousness: 0.30
        },
        typicalValues: ["Power", "Achievement", "Self-Direction"],
        education: {
            tertiaryProbability: 0.8,
            label: "Higher Education"
        }
    },
    "University Professor": {
        group: "Professional",
        offsets: {
            Neuroticism: -0.10,
            Extraversion: 0.10,
            Openness: 0.35,
            Agreeableness: 0.15,
            Conscientiousness: 0.25
        },
        typicalValues: ["Universalism", "Benevolence", "Openness to Change"],
        education: {
            tertiaryProbability: 0.95,
            label: "Tertiary Education (Doctorate)"
        }
    },
    "Sales Manager": {
        group: "Sales",
        offsets: {
            Neuroticism: 0.00,
            Extraversion: 0.30,
            Openness: 0.15,
            Agreeableness: 0.10,
            Conscientiousness: 0.20
        },
        typicalValues: ["Achievement", "Power", "Hedonism"],
        education: {
            tertiaryProbability: 0.5,
            label: "Medium/High Education"
        }
    },
    "Electrician": {
        group: "SkilledLabor",
        offsets: {
            Neuroticism: 0.00,
            Extraversion: 0.00,
            Openness: -0.10,
            Agreeableness: 0.00,
            Conscientiousness: 0.10
        },
        typicalValues: ["Security", "Conformity", "Tradition"],
        education: {
            tertiaryProbability: 0.2,
            label: "Vocational/Technical Training"
        }
    },
    "Administrative Assistant": {
        group: "RoutineNonManual",
        offsets: {
            Neuroticism: 0.00,
            Extraversion: 0.10,
            Openness: 0.05,
            Agreeableness: 0.10,
            Conscientiousness: 0.15
        },
        typicalValues: ["Security", "Conformity", "Benevolence"],
        education: {
            tertiaryProbability: 0.3,
            label: "Medium Education"
        }
    },
    "Software Developer": {
        group: "Professional",
        offsets: {
            Neuroticism: -0.10,
            Extraversion: 0.05,
            Openness: 0.35,
            Agreeableness: 0.10,
            Conscientiousness: 0.25
        },
        typicalValues: ["Universalism", "Achievement", "Self-Direction"],
        education: {
            tertiaryProbability: 0.85,
            label: "Tertiary Education (Bachelors/Masters)"
        }
    },
    "Nurse": {
        group: "Professional",
        offsets: {
            Neuroticism: -0.10,
            Extraversion: 0.15,
            Openness: 0.20,
            Agreeableness: 0.30,
            Conscientiousness: 0.25
        },
        typicalValues: ["Benevolence", "Universalism", "Conformity"],
        education: {
            tertiaryProbability: 0.75,
            label: "Tertiary Education (Nursing/Medical)"
        }
    },
    "Artist": {
        group: "Professional",
        offsets: {
            Neuroticism: 0.15,
            Extraversion: 0.10,
            Openness: 0.50,
            Agreeableness: 0.15,
            Conscientiousness: -0.10
        },
        typicalValues: ["Self-Direction", "Universalism", "Openness to Change"],
        education: {
            tertiaryProbability: 0.60,
            label: "Tertiary Education (Creative Arts)"
        }
    },
    "Police Officer": {
        group: "SkilledLabor",
        offsets: {
            Neuroticism: -0.20,
            Extraversion: 0.10,
            Openness: -0.15,
            Agreeableness: 0.05,
            Conscientiousness: 0.25
        },
        typicalValues: ["Security", "Conformity", "Tradition"],
        education: {
            tertiaryProbability: 0.25,
            label: "Secondary Education (Vocational Training)"
        }
    },
    "Entrepreneur": {
        group: "Manager",
        offsets: {
            Neuroticism: -0.30,
            Extraversion: 0.40,
            Openness: 0.30,
            Agreeableness: 0.00,
            Conscientiousness: 0.30
        },
        typicalValues: ["Power", "Achievement", "Self-Direction"],
        education: {
            tertiaryProbability: 0.70,
            label: "Higher Education"
        }
    },
    "Medical Doctor": {
        group: "Professional",
        offsets: {
            Neuroticism: -0.15,
            Extraversion: 0.15,
            Openness: 0.25,
            Agreeableness: 0.25,
            Conscientiousness: 0.40
        },
        typicalValues: ["Benevolence", "Universalism", "Achievement"],
        education: {
            tertiaryProbability: 0.99,
            label: "Tertiary Education (Medical Degree)"
        }
    },
    "Elementary School Teacher": {
        group: "Professional",
        offsets: {
            Neuroticism: -0.05,
            Extraversion: 0.20,
            Openness: 0.30,
            Agreeableness: 0.35,
            Conscientiousness: 0.20
        },
        typicalValues: ["Benevolence", "Universalism", "Conformity"],
        education: {
            tertiaryProbability: 0.90,
            label: "Tertiary Education (Education Degree)"
        }
    },
    "Sales Representative": {
        group: "Sales",
        offsets: {
            Neuroticism: 0.00,
            Extraversion: 0.45,
            Openness: 0.10,
            Agreeableness: 0.10,
            Conscientiousness: 0.15
        },
        typicalValues: ["Power", "Achievement", "Hedonism"],
        education: {
            tertiaryProbability: 0.40,
            label: "Medium Education"
        }
    },
    "Data Entry Clerk": {
        group: "RoutineNonManual",
        offsets: {
            Neuroticism: 0.05,
            Extraversion: -0.05,
            Openness: -0.10,
            Agreeableness: 0.05,
            Conscientiousness: 0.20
        },
        typicalValues: ["Security", "Conformity", "Tradition"],
        education: {
            tertiaryProbability: 0.20,
            label: "Secondary Education"
        }
    }
};


