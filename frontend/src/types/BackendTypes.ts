export type UserProfileResponseType ={
    userInfo: {
        _id: string;
        email: string;
        username: string;
        firstname: string;
        lastname: string;
    };
    avatar: string;
    avatarOptions: [
        {
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
    ]
}


export type UserPersonalBEPostType = {
    _id: string;
    userId: string;
    title: string;
    recipe: string,
    images: string[];
    lastUpdated: Date;
}
