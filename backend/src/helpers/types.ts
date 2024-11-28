import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
    _id: string;
    email: string;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    avatar: {name: string, url: string};
    friends: {
        friendsRequestUsernames: string[];
        friendsUsernames: string[];
    };
}

export interface IUserAvatarSigned extends Document {
    _id: string;
    userId: string;
    avatar: string;
}


export interface IComment extends Document {
    post: mongoose.Schema.Types.ObjectId;
    author: mongoose.Schema.Types.ObjectId;
    text: string;
    parentComment: mongoose.Schema.Types.ObjectId;
    likes: [mongoose.Schema.Types.ObjectId];
    replies: [mongoose.Schema.Types.ObjectId];
}

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

export interface IUserPersonalPost extends Document{
    _id: string;
    user: mongoose.Schema.Types.ObjectId ;
    title: string;
    recipe: string,
    images: string[];
    lastUpdated: Date;
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


