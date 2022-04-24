const { Contact } = require("../../models");

const getAll = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const total = await Contact.estimatedDocumentCount();
  const contacts = await Contact.find({ owner: _id }, "", {
    skip,
    limit: Number(limit),
  }).populate("owner", "_id email");
  res.json({
    status: "success",
    code: 200,
    data: {
      result: contacts,
      total,
      pages: Math.ceil(total / limit),
    },
  });
};

module.exports = getAll;
