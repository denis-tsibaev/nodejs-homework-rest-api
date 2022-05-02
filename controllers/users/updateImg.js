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
    const avatarURL = `/public/avatars/John5/${originalname}`;
    await User.findByIdAndUpdate("626fb8cf2cee1d4c2a2b9982", { avatarURL });
    res.json({
      status: "success",
      code: 200,
      data: {
        result: avatarURL,
      },
    });
  } catch (error) {
    await fs.unlink(tempPath);
    throw error;
  }
};

module.exports = updateImg;
