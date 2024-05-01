
export type UserPersonalPostType = {
    _id: string;
    userId: string;
    title: string;
    recipe: string,
    images: string[];
    lastUpdated: Date;
}

export type UserAvatarSignedType = {
    _id:string;
    userId:string;
    avatar:string;
}

export type UserAvatarsOptionsType = {
    _id: string;
    cooltomato: string;
    babycoolmango: string;
    vibingmelon: string;
    chadcarrot: string;
    cutepeach: string;
    selfloveorange: string;
    badassmelon: string;
    victoryfruit: string;
    smolkarot: string;
    bossylemon: string;
}


