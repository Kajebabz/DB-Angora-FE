// src/types/enumTypes.ts
export type RabbitEnum = 'Race' | 'Color' | 'Gender' | 'IsPublic';

export interface EnumEndpoints {
    Race: string;
    Color: string;
    Gender: string;
    IsPublic: string;
}

export const ENUM_ENDPOINTS: EnumEndpoints = {
    Race: 'https://db-angora.dk/api/Enum/Races',
    Color: 'https://db-angora.dk/api/Enum/Colors',
    Gender: 'https://db-angora.dk/api/Enum/Genders',
    IsPublic: 'https://db-angora.dk/api/Enum/IsPublic'
};