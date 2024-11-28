import { Request, Response } from "express"
import { getUsersAvatarData } from "../helpers/getUserAvatarData.helper";
import { validationResult } from "express-validator";
import User from "../models/user.model";

export type avatarType = {
    avatarName: string;
}

export const updateUserAvatar = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: errors.array() });
    }

    try {
        const { avatarName }: avatarType = req.body;
        const userId = req.userId;
        const userAvatarsData = await getUsersAvatarData(avatarName);
        if (!avatarName) {
            return res.status(500).send({ message: 'Avatar does not exists!' });
        }

        const filter = { _id: userId };
        const update = { $set: { avatar: { name: avatarName, url: userAvatarsData.avatar } } };
        await User.findOneAndUpdate(filter, update, { new: true });

        //return res.status(200).json({ updatedAvatar: avatarOptions[avatarName] });
        return res.status(200).json({ updatedAvatar: userAvatarsData.avatar });
    } catch (e) {
        console.log('Error updating user avatar', e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
}
