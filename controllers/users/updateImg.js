const fs = require("fs/promises");
const path = require("path");

const { User } = require("../../models");

const avatarsDir = path.join(__dirname, "../../", "public/avatars");

// Захардкодил имя пользователя, надо извлечь name либо id
const updateImg = async (req, res) => {
  const { path: tempPath, originalname } = req.file;
  const uploadPath = path.join(avatarsDir, "John5", originalname);
  try {
    await fs.rename(tempPath, uploadPath);
    const imagePath = `/public/avatars/${"John5"}/${originalname}`;
    User.findByIdAndUpdate("id", { imagePath });
    res.json({
      status: "success",
      code: 200,
      data: {
        result: imagePath,
      },
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateImg;
