const { Contact } = require("../../models");

const removeById = async (req, res) => {
  const contact = await Contact.findByIdAndRemove(req.params.id);
  if (contact) {
    return res.json({
      status: "contact deleted",
      code: 200,
      payload: { contact },
    });
  }
  return res.status(404).json({
    status: "error",
    code: 404,
    message: "Not Found",
  });
};

module.exports = removeById;
