export type Rabbit = {
    "$id": number,
    "earCombId": string,
    "nickName": string,
    "race": string,
    "color": string,
    "gender": string,
    "userOwner": string,
    "userOrigin": string
};

export type RabbitProfileDTO = {
    "$id": number,
    "earCombId": string,
    "nickName": string,
    "originId": string,
    "ownerId": string,
    "race": string,
    "color": string,
    "approvedRaceColorCombination": boolean,
    "dateOfBirth": Date,
    "dateOfDeath": Date,
    "isJuvenile": boolean,
    "gender": string,
    "forSale": string,
    "forBreeding": string,
    "fatherId_Placeholder": string,
    "father_EarCombId": string,
    "motherId_Placeholder": string,
    "mother_EarCombId": string,
    "children": {
        "$id": number,
        "$values": Rabbit_ChildPreviewDTO[]
    }
};

export type Rabbit_ChildPreviewDTO = {
    "$id": number,
    "earCombId": string,
    "dateOfBirth": Date,
    "nickName": string,
    "color": string,
    "gender": string,
    "otherParentId": string,
};



export type RabbitResponse = {
    "$id": number,
    "$values": Rabbit[]
};

export type LoginResponse = {
    "$id": number,
    "userName": string,
    "accessToken": string,
    "expiryDate": Date,
    "refreshToken": string,
    "errors": {
        "$id": number,
        "$values": []
    }
};