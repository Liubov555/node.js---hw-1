
const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");


// TODO: задокументувати кожну функцію
const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
};

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contact.id === contactId);
    if (!result) return null;
    return result;
};

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) return null;

    const [deleteContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return deleteContact;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const allContacts = { name, email, phone }
    const newContact = { ...allContacts, id: v4() };
    contacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return contacts;
};

module.exports = { listContacts, getContactById, addContact, removeContact };