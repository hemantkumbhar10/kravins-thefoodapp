
export interface FriendsQueryParamsType {
    name?: string;
}

export interface FriendsConstructQueryType {
    $or?: {
        firstname?: RegExp;
        lastname?: RegExp;
        username?: RegExp;
        email?: RegExp;
    }[];
}


export const constructSearchQueryForFriends = (queryParams: FriendsQueryParamsType): FriendsConstructQueryType => {

    let constructQuery: FriendsConstructQueryType = {}

    if (queryParams.name) {
        constructQuery.$or = [

            { firstname: new RegExp(queryParams.name, "i") },
            { lastname: new RegExp(queryParams.name, "i") },
            { username: new RegExp(queryParams.name) },
            { email: new RegExp(queryParams.name, "i") },

        ]
    }

    return constructQuery;
}