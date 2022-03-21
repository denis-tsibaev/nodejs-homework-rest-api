const { randomUUID } = require("crypto");
const DB = require("./db");
const db = new DB("contacts.json");
// const db = new DB(process.env.DB_HOST);
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const DB_HOST =
//   "mongodb+srv://goit37:goit37@cluster0.qid3b.mongodb.net/db-contacts?retryWrites=true&w=majority";

// dotenv();

// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("Database connected!"))
//   .catch((err) => {
//     console.log(err.message);
//     process.exit(1);
//   });

const listContacts = async () => {
  return await db.read();
};

const getContactById = async (contactId) => {
  const contacts = await db.read();
  const [contact] = contacts.filter((contact) => contact.id === contactId);
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    const [contact] = contacts.splice(index, 1);
    await db.write(contacts);
    return contact;
  }
  return null;
};

const addContact = async (body) => {
  const contacts = await db.read();
  const newContact = {
    id: randomUUID(),
    ...body,
  };
  contacts.push(newContact);
  await db.write(contacts);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await db.read();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    contacts[index] = { ...contacts[index], ...body };
    await db.write(contacts);
    return contacts[index];
  }
  return null;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
