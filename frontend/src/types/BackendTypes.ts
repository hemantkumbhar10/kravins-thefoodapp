
export type FriendsResponseType = {
  friendsRequestUsernames: string[];
  friendsUsernames: string[];
}


type UserBaseType = {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
}

export type UserProfileResponseType = {
  user: UserBaseType & {
    _id: string;
    friends: FriendsResponseType;
  };
  avatar: string;
  avatarOptions: [{
    [key: string]: string;
  }]
}


export type UserAvatarResponseType = { updatedAvatar: string };


export type FriendsInfoReturnType = UserBaseType & {
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



export type ConnectedFriendsResponse = [UserBaseType & {
  friendId: string,
  avatar: string;

}]

export type UserPersonalBEPostType = {
  _id: string;
  userId: string;
  title: string;
  recipe: string;
  images: string[];
  lastUpdated: Date;
}



export type UserPostsData = {
  user: UserProfileResponseType['user'],
  avatarUrl: string,
  post: UserPersonalBEPostType,
}

export interface FeedPosts {
  data: UserPostsData[],
  pagination: {
    total: number
  }
}













