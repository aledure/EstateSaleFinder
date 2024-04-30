const path = require("path");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

// const uploadItemImageLocal = async (req, res) => {
//     if (!req.files) {
//         throw new CustomError.BadRequestError("No File Uploaded");
//     }
//     const itemImage = req.files.image;

//     if (!itemImage.mimetype.startsWith("image")) {
//         throw new CustomError.BadRequestError("Please Upload Image");
//     }

//     const maxSize = 1024 * 1024 * 3;

//     if (itemImage.size > maxSize) {
//         throw new CustomError.BadRequestError(
//             "Please Upload Image Smaller Than 3 MB"
//         );
//     }

//     const imagePath = path.join(
//         __dirname,
//         "../images/uploads/" + `${itemImage.name}`
//     );
//     await itemImage.mv(imagePath);
//     return res
//         .status(StatusCodes.OK)
//         .json({ image: { src: `/uploads/${itemImage.name}` } });
// };

const uploadItemImage = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError("No File Uploaded");
    }

    if (!req.files.image.mimetype.startsWith("image")) {
        throw new CustomError.BadRequestError("Please Upload Image");
    }

    const maxSize = 1024 * 1024 * 3;

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
    fs.unlinkSync(req.files.image.tempFilePath);
    return res
        .status(StatusCodes.OK)
        .json({ image: { src: result.secure_url } });
};

module.exports = { uploadItemImage };