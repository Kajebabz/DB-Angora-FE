// src/types/enumTypes.ts
import { getApiUrl } from '@/config/apiConfig';

export type RabbitEnum = 'Race' | 'Color' | 'Gender' | 'IsPublic';

export interface EnumEndpoints {
    Race: string;
    Color: string;
    Gender: string;
    IsPublic: string;
}

export const ENUM_ENDPOINTS: EnumEndpoints = {
    Race: getApiUrl('Enum/Races'),
    Color: getApiUrl('Enum/Colors'),
    Gender: getApiUrl('Enum/Genders'),
    IsPublic: getApiUrl('Enum/IsPublic')
};