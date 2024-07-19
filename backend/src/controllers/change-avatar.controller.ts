import { Request, Response } from "express"
import { getUsersAvatarData } from "../helpers/getUserAvatarData.helper";
import UsersAvatarSigned from "../models/user-avatars.model";
import { validationResult } from "express-validator";


export type avatarType = {
    avatarName: string;
}

export const updateUserAvatar = async (req: Request, res: Response) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({ message: errors.array() });
    }

    try {
        const avatarReqBody: avatarType = req.body;
        const avatarName = avatarReqBody.avatarName;
        const userId = req.userId;

        const userAvatarsData = await getUsersAvatarData(userId);
        const avatarOptions = userAvatarsData.avatarOptions[0];

        if (!avatarOptions[avatarName]) {
            return res.status(500).send({ message: 'Avatar does not exists!' });
        }
        const filter = { userId: userId };
        const update = { avatar: avatarName };
        const userAvatarUpdatedData = await UsersAvatarSigned.findOneAndUpdate(filter, update);

        return res.status(200).json({ updatedAvatar: avatarOptions[avatarName] });
    } catch (e) {
        console.log('Error updating user avatar', e);
        res.status(500).send({ message: 'Something went wrong!' });
    }
}