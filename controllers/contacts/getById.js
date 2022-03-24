const { Contact } = require("../../models");

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  console.log(contact);
  if (contact) {
    res.json({
      status: "success",
      code: 200,
      payload: { contact },
    });
  } else
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not Found",
    });
};

module.exports = getById;
