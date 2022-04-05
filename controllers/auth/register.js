const { Conflict } = require("http-errors");
const { User } = require("../../models");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exists`);
  }
  const result = await User.create({ name, email, password });
  res.status(201).json({
    status: "success",
    data: {
      user: {
        email,
        name,
      },
    },
  });
};

module.exports = register;
