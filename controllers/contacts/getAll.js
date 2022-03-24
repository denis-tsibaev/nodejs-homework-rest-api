const { Contact } = require("../../models");

const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "server error",
    });
  }
};

module.exports = getAll;
