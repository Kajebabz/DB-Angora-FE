// src/services/enumService.ts
import { ENUM_ENDPOINTS, RabbitEnum } from '@/types/enumTypes';

export async function getEnumValues(enumType: RabbitEnum): Promise<string[]> {
    const response = await fetch(ENUM_ENDPOINTS[enumType]);
    return response.json();
}