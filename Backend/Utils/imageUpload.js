const cloudinary = require("cloudinary").v2;



exports.imageUpload = async(file, folder) => {
    try{
        return await cloudinary.uploader.upload(file.tempFilePath, {
            folder: folder,
            public_id: file.name.split(".")[0],
            resource_type: "auto",
            transformation:{
                quality: "auto",
            }
        })
    }catch(err){
       console.log("Error during image upload", err.message);
       throw new Error("File Upload Failed");
    }
}