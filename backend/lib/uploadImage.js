
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadItemImage = async (files) => {
    if (!files) {
        throw new CustomError.BadRequestError("No File Uploaded");
    }

    if (!files.image.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Please Upload Image");
    }

    const maxSize = 1024 * 1024 * 3;

    if (files.image.size > maxSize) {
        throw new CustomError.BadRequestError(
            "Please Upload Image Smaller Than 3 MB"
        );
    }
    const result = await cloudinary.uploader.upload(
        files.image.tempFilePath,
        {
            use_filename: true,
            folder: "estateSaleFinder",
        }
    );
    fs.unlinkSync(files.image.tempFilePath);
    return result.secure_url
};

module.exports = { uploadItemImage };