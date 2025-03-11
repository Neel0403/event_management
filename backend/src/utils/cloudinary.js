import { v2 as cloudinary } from "cloudinary"
import fs from "fs"  // file system(default library in node)


cloudinary.config({
    // cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    cloud_name: "neel04",
    // api_key: process.env.CLOUDINARY_API_KEY,
    api_key: 281376757785878,
    // api_secret: process.env.CLOUDINARY_API_SECRET
    api_secret: "BmuxyZHXLhT3PpDsAnN5NHPzoqI"
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        // upload file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // file is uploaded
        console.log("File is uploaded on cloudinary", response.url);
        return response
    } catch (error) {
        console.log("Error uploading file on cloudinary", error);
        fs.unlinkSync(localFilePath)  // remove locally saved temp file as upload operation failed
        return null;
    }
}


export { uploadOnCloudinary }