const { Contact } = require("../../models");

const removeById = async (req, res, next) => {
  const contact = await Contact.removeContact(req.params.contactId);
  if (contact) {
    return res.json({
      status: "contact deleted",
      code: 200,
      payload: { contact },
    });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
};

module.exports = removeById;
