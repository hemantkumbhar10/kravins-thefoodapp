export interface IUser {
    _id: string;
    email: string;
    username: string;
    firstname: string;
    lastname: string;
    avatar: {
        name: string;
        url: string;
    },
    friends: FriendsResponseType;
}

export interface IUserPersonalPost {
    _id: string;
    user: IUser;
    title: string;
    recipe: string,
    images: string[];
    lastUpdated: Date;
}

export interface IUserCommentsResponse {
    _id: string;
    post: string;
    author: IUser;
    text: string;
    parentComment: string;
    likes: [string];
    replies: IUserCommentsResponse[];
    createdAt: string;
    updatedAt: string;
}

export interface UserPersonalBEPostType extends IUserPersonalPost {
    comments: IUserCommentsResponse[];
}

export interface IUserPostsWithComments {
    post:IUserPersonalPost;
    comments: IUserCommentsResponse[];
}

export interface FeedPosts {
    data: IUserPostsWithComments[],
    pagination: {
        total: number
    }
}

export type FriendsResponseType = {
    friendsRequestUsernames: string[];
    friendsUsernames: string[];
}

export type UserProfileResponseType = {
    user: IUser;
    avatarOptions: [{
        [key: string]: string;
    }]
}

export type UserAvatarResponseType = { updatedAvatar: string };

export type FriendsInfoReturnType = IUser & {
    friendId: string;
    avatar: string;
};

export type FriendsSearchReponseType = {
    data: FriendsInfoReturnType[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    };
}

export type ConnectedFriendsResponse = [IUser & {
    friendId: string,
    avatar: string;

}]

export interface UserPostsData {
    user: UserProfileResponseType['user'],
    avatarUrl: string,
    post: UserPersonalBEPostType,
    comments: IUserCommentsResponse[]
}

export interface QueryFeedPostsCache {
    pageParams: [];
    pages: FeedPosts[];
}
