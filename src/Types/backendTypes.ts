// src>types>backendTypes.ts
export interface Rabbit_ForsalePreviewDTO {
    earCombId: string;
    nickName: string;
    dateOfBirth: string;
    race: string;
    color: string;
    gender: string;
    zipCode: number;
    city: string;
    profilePicture: string;
    userOwner: string;
}

export interface Rabbit_ForsaleProfileDTO {
    earCombId: string;
    nickName: string | null;
    originFullName: string | null;
    ownerFullName: string | null;
    race: string | null;
    color: string | null;
    approvedRaceColorCombination: boolean | null;
    dateOfBirth: string | null;  // API: string($date) format, nullable
    dateOfDeath: string | null;
    isJuvenile: boolean | null;
    gender: string | null;
    forSale: string | null;
    forBreeding: string | null;
    fatherId_Placeholder: string | null;
    father_EarCombId: string | null;
    motherId_Placeholder: string | null;
    mother_EarCombId: string | null;
    children: Rabbit_ChildPreviewDTO[];
}


export interface Rabbit_ProfileDTO {
    earCombId: string;
    nickName: string | null;
    originFullName: string | null;
    ownerFullName: string | null;
    race: string | null;
    color: string | null;
    approvedRaceColorCombination: boolean | null;
    dateOfBirth: string | null;  // API: string($date) format, nullable
    dateOfDeath: string | null;
    isJuvenile: boolean | null;
    gender: string | null;
    forSale: string | null;
    forBreeding: string | null;
    fatherId_Placeholder: string | null;
    father_EarCombId: string | null;
    motherId_Placeholder: string | null;
    mother_EarCombId: string | null;
    children: Rabbit_ChildPreviewDTO[];
}

export interface Rabbit_CreateDTO {
    rightEarId: string;
    leftEarId: string;
    nickName: string;
    race: string;
    color: string;
    dateOfBirth: string;
    dateOfDeath?: string | null;
    gender: string;
    forSale: string;
    forBreeding: string;
    father_EarCombId?: string | null;
    mother_EarCombId?: string | null;
}

export interface Rabbit_UpdateDTO {
    nickName: string | null;
    race: string | null;
    color: string | null;
    dateOfBirth: string | null;
    dateOfDeath: string | null;
    gender: string | null;
    forSale: string | null;
    forBreeding: string | null;
    fatherId_Placeholder: string | null;
    motherId_Placeholder: string | null;
}

export interface Rabbit_ChildPreviewDTO {
    earCombId: string;
    dateOfBirth: string | null;
    nickName: string | null;
    color: string | null;
    gender: string | null;
    otherParentId: string | null;
}

export type Rabbits_ForsalePreviewList = Rabbit_ForsalePreviewDTO[];

export interface LoginResponse {
    userName: string;
    accessToken: string;
    expiryDate: Date;
    refreshToken: string;
    errors: string[];
}