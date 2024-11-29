// src>types>backendTypes.ts
export type Rabbit_PreviewDTO = {
    "earCombId": string,
    "nickName": string,
    "race": string,
    "color": string,
    "gender": string,
    "userOwner": string,
    "userOrigin": string
};

export type Rabbit_ProfileDTO = {
    "earCombId": string,
    "nickName": string | null,
    "originFullName": string | null,
    "ownerFullName": string | null,
    "race": string | null,
    "color": string | null,
    "approvedRaceColorCombination": boolean | null,
    "dateOfBirth": string | null,  // API: string($date) format, nullable
    "dateOfDeath": string | null,
    "isJuvenile": boolean | null,
    "gender": string | null,
    "forSale": string | null,
    "forBreeding": string | null,
    "fatherId_Placeholder": string | null,
    "father_EarCombId": string | null,
    "motherId_Placeholder": string | null,
    "mother_EarCombId": string | null,
    "children": Rabbit_ChildPreviewDTO[]
};

export type Rabbit_UpdateDTO = {
    "nickName": string| null,
    "race": string| null,
    "color": string| null,
    "dateOfBirth": string| null,
    "dateOfDeath": string| null,
    "gender": string | null,
    "forSale": string | null,
    "forBreeding": string | null,
    "fatherId_Placeholder": string | null,
    "motherId_Placeholder": string | null,
};

export type Rabbit_ChildPreviewDTO = {
    "earCombId": string,
    "dateOfBirth": string| null,
    "nickName": string | null,
    "color": string | null,
    "gender": string | null,
    "otherParentId": string | null,
};

export type Rabbits_PreviewList = Rabbit_PreviewDTO[];

export type LoginResponse = {
    "userName": string,
    "accessToken": string,
    "expiryDate": Date,
    "refreshToken": string,
    "errors": string[]
};