import React from "react";


type AvatarsProps =
    {
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



export const Avatars: React.FC<AvatarsProps> = ({ cooltomato, babycoolmango, vibingmelon,
    chadcarrot, cutepeach, selfloveorange, badassmelon, victoryfruit, smolkarot,
    bossylemon }) => {

    // const avatar = localStorage.getItem('userAvatar')!;

    return (
        <div className='w-full h-4/6 md:w-2/4 md:h-auto bg-white rounded-xl'>
            <h3 className='text-xl font-bold p-5 border-b-2 border-gray-200 text-tomato'>Choose Your Avatar</h3>
            <div className="w-full flex justify-center items-center">
                <div className='p-3 mx-3 border-b-2 rounded-md grid grid-cols-5 grid-rows-2 gap-x-4 gap-y-4'>
                    <img src={cooltomato} alt="" className="w-[90px] rounded-full" />
                    <img src={babycoolmango} alt="" className="w-[90px] rounded-full" />
                    <img src={chadcarrot} alt="" className="w-[90px] rounded-full" />
                    <img src={cutepeach} alt="" className="w-[90px] rounded-full" />
                    <img src={selfloveorange} alt="" className="w-[90px] rounded-full" />
                    <img src={badassmelon} alt="" className="w-[90px] rounded-full" />
                    <img src={victoryfruit} alt="" className="w-[90px] rounded-full" />
                    <img src={smolkarot} alt="" className="w-[90px] rounded-full" />
                    <img src={vibingmelon} alt="" className="w-[90px] rounded-full" />
                    <img src={bossylemon} alt="" className="w-[90px] rounded-full" />
                </div>
            </div>
        </div>
    )
}
