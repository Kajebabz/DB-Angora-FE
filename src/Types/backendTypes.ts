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