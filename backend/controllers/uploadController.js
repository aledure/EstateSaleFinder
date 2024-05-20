const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs").promises; // Use fs.promises to work with promises

const uploadItemImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError("No File Uploaded");
    }

    if (!req.files.image.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Please Upload Image");
    }

    const maxSize = 1024 * 1024 * 3; // Corrected size limit to 3 MB

    if (req.files.image.size > maxSize) {
        throw new CustomError.BadRequestError(
            "Please Upload Image Smaller Than 3 MB"
        );
    }

    try {
        const result = await cloudinary.uploader.upload(
            req.files.image.tempFilePath,
            {
                use_filename: true,
                folder: "estateSaleFinder",
            }
        );

        console.log(result.secure_url)

        // await fs.unlink(req.files.image.tempFilePath); // Await the promise returned by fs.promises.unlink

        const response = {
            image: {
                src: result.secure_url,
            },
        };


        return response
    } catch (error) {
        throw new Error("Something went wrong");
    }
};

module.exports = { uploadItemImage };
