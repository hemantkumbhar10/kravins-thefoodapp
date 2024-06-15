export type UserProfileResponseType = {
    user: {
        _id: string;
        email: string;
        username: string;
        firstname: string;
        lastname: string;
    };
    avatar: string;
    avatarOptions: [{
        [key: string]: string;
    }];
}


export type UserPersonalBEPostType = {
    _id: string;
    userId: string;
    title: string;
    recipe: string,
    images: string[];
    lastUpdated: Date;
}
