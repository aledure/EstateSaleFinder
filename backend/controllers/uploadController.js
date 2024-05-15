const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

const uploadItemImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError("No File Uploaded");
    }

    if (!req.files.image.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Please Upload Image");
    }

    const maxSize = 1024 * 1024 * 50;

    if (req.files.image.size > maxSize) {
        throw new CustomError.BadRequestError(
            "Please Upload Image Smaller Than 3 MB"
        );
    }
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: "estateSaleFinder",
        }
    );
    fs.unlink(req.files.image.tempFilePath);
    return res
        .status(StatusCodes.OK)
        .json({ image: { src: result.secure_url } });
};

module.exports = { uploadItemImage };