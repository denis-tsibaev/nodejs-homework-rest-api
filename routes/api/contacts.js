const express = require("express");
const router = express.Router();
const contactModel = require("../../models/contact");
// contactModel некая модель с методами
const schemaCreateContact = require("./contacts-validation-schemes");
const validateBody = require("../../middlewares/validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactModel.listContacts();
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
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contactModel.getContactById(req.params.contactId);
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

router.post("/", validateBody(schemaCreateContact), async (req, res, next) => {
  const newContact = await contactModel.addContact(req.body);
  res
    .status(201)
    .json({ status: "success", code: 201, payload: { newContact } });
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await contactModel.removeContact(req.params.contactId);
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
});

router.put("/:contactId", async (req, res, next) => {
  const contact = await contactModel.updateContact(
    req.params.contactId,
    req.body
  );
  if (contact) {
    return res.json({ status: "success", code: 200, payload: { contact } });
  }
  return res
    .status(404)
    .json({ status: "error", code: 404, message: "Not Found" });
});

module.exports = router;
