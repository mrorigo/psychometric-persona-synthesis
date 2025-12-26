export type Domain = 'Extraversion' | 'Agreeableness' | 'Conscientiousness' | 'Neuroticism' | 'Openness';
export type Perspective = 'first' | 'second' | 'third';
export type OccupationalGroup = 'Professional' | 'Manager' | 'Sales' | 'SkilledLabor' | 'RoutineNonManual';
export type FilterLevel = 'none' | 'strong' | 'extreme';

export type OccupationalOffsets = {
    [domain in Domain]: number;
};

export interface RoleMetadata {
    group: OccupationalGroup;
    offsets: OccupationalOffsets;
    typicalValues: string[];
    education: {
        tertiaryProbability: number;
        label: string;
    };
}


export interface BFI2Item {
    id: number;
    description: string;
    domain: Domain;
    isReverse: boolean;
}

export interface BFI2Score {
    [itemId: number]: number;
}

export type DomainScores = {
    [domain in Domain]: number;
};


export type IntensityMap = Record<number, string>;
export type ItemMap = Record<number, BFI2Item>;
