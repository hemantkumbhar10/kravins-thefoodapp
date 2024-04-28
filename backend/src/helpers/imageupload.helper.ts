import multer from 'multer';


const memory_storage = multer.memoryStorage();


export const uploadImage = multer({
    storage: memory_storage,

    limits: {
        fileSize: 5 * 1024 * 1024, //5MB
    }
});