const { Contact } = require("../../models");

const add = async (req, res) => {
  const newContact = await Contact.addContact(req.body);
  res
    .status(201)
    .json({ status: "success", code: 201, payload: { newContact } });
};

module.exports = add;
