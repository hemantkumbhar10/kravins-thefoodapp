import { Request, Response } from "express";
import User from "../models/user.model";

//BUILD THIS FETAURE AFTER BUILDING FRIEND REQUEST FEATURE
export const addFriend = async (req: Request, res: Response) => {
    try {
        const friendsUsername = req.body.friendsUsername;

        const userId = req.userId;
        const user = await User.findById(userId).select(['username', 'friends']);

        const friend = await User.findOne({ username: friendsUsername });

        if (!user) {
            return res.status(400).send({ message: 'User does not exists!' });
        }
        if (!friend) {
            return res.status(400).send({ message: 'This person does not exists!' });
        }

        if (friendsUsername === user.username) {
            return res.status(400).send({ message: 'Cannot send friend request to yourself!' });
        }

        //if person is already in users friendRequest list, then remove it first from there
        if (user.friends.friendsRequestUsernames.includes(friendsUsername)) {
            user.friends.friendsRequestUsernames = user.friends.friendsRequestUsernames.filter(username => username !== friendsUsername);
            await user.save();
        }

        if (user.friends.friendsUsernames.includes(friendsUsername)) {
            return res.status(400).send({ message: 'This person is already your friend!' });
        }

        if (friend.friends.friendsRequestUsernames.includes(user.username)) {
            return res.status(400).send({ message: 'Already sent a friend request!' });
        }

        user.friends.friendsUsernames.push(friendsUsername);

        //if the user is already in persons friendlist, then do not push users username in persons requestlist
        if (!friend.friends.friendsUsernames.includes(user.username)) {
            friend.friends.friendsRequestUsernames.push(user.username);
            await friend.save();
        }
        await user.save();
        await friend.save();
        return res.status(200).json(user);

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
};


export const deleteFriend = async (req: Request, res: Response) => {
    try {
        const friendsUsername = req.body.friendsUsername;
        const userId = req.userId;
        const user = await User.findById(userId).select(['username', 'friends']);

        const friend = await User.findOne({ username: friendsUsername });

        if (!user) {
            return res.status(400).send({ message: 'User does not exists!' });
        }
        if (!friend) {
            return res.status(400).send({ message: 'This person does not exists!' });
        }

        //If requested persons username is in users FriendRequests, remove it
        if (user.friends.friendsRequestUsernames.includes(friendsUsername)) {
            user.friends.friendsRequestUsernames = user.friends.friendsRequestUsernames.filter(username => username !== friendsUsername);
            await user.save();
        }

        //if user who sent friendrequest want to delete sent request, check if friends username
        //is is in users FriendsUsernames, and remove it
        if (user.friends.friendsUsernames.includes(friendsUsername)) {
            user.friends.friendsUsernames = user.friends.friendsUsernames.filter(username => username !== friendsUsername);
            await user.save();
        }

        //if user who sent want to delete friend he himself sent request,i checked if 
        //users username is in friends RequestList, and remove it
        if (friend.friends.friendsRequestUsernames.includes(user.username)) {
            friend.friends.friendsRequestUsernames = friend.friends.friendsRequestUsernames.filter(username => username !== user.username);
            await friend.save();
        }

        //If users username is in requested persons FriendsUsernames, remove it
        if (friend.friends.friendsUsernames.includes(user.username)) {
            friend.friends.friendsUsernames = friend.friends.friendsUsernames.filter(username => username !== user.username);
            await friend.save();
        }

        return res.status(200).send({ message: 'Deleted friend request!' });

    } catch (e) {
        console.log(e);
        return res.status(500).send({ message: 'Something went wrong!' });
    }
}