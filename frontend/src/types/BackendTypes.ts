export type UserProfileResponseType = {
    user: {
        _id: string;
        email: string;
        username: string;
        firstname: string;
        lastname: string;
        friends: {
            friendsRequestUsernames: string[];
            friendsUsernames: string[];
        };
    };
    avatar: string;
    avatarOptions: [{
        [key: string]: string;
    }];

}

export type UserAvatarResponseType = { updatedAvatar: string }

export type FriendsInfoReturnType = {
    friendId: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    avatar: string;
}

export type FriendsSearchResponse = {
    data: FriendsInfoReturnType[];
    pagination: {
        total: number,
        page: number,
        pages: number,
    }
}

export type ConnectedFriendsResponse = [{
    friendId: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    avatar: string,
}]


export type UserPersonalBEPostType = {
    _id: string;
    userId: string;
    title: string;
    recipe: string,
    images: string[];
    lastUpdated: Date;
}
