import cloudinary from 'cloudinary';

export const uploadImages = async (image_data: Express.Multer.File[]) => {

    try {
        //UPLOADING IMAGES TO CLOUDINARY AND STORES ARRAY OF IMAGE URLS OF UPLADED IMAGES
        const uploadPromises: Promise<string>[] = image_data.map(async (image) => {
        
            //CONVERTS SOMETHING LIKE <Buffer 00 f6 a8... BUFFER IMAGE DATA 
            //TO BASE 64 SOMNETHING LIKE "/N/d" STRING FOR SECURITY AND OTHE RRELAIBLE PURPOSES
            const base_64 = Buffer.from(image.buffer).toString("base64");
            let imageURI = `data:${image.mimetype};base64,${base_64}`;
            const res = await cloudinary.v2.uploader.upload(imageURI);
            return res.url;

        })

        //WAITING TO UPLOAD ALL IMAGES AND GET A IMAGE URL ARRAY
        //BASICALLY TELLING THAT ANY OF THE IMAGE URL UPLOAD FAILED THEN THROW THE ERROR
        const imageUrls = await Promise.all(uploadPromises);

        return imageUrls;

    } catch (error:any) {
        throw new Error('Image upload failed: '+ error)

    }
} 