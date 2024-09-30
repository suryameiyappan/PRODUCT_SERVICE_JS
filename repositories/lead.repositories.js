const Users = require("../entities/users.entities");

async function leadRetrive() {
  try {
    return await Users.find();
  } catch (error) {
    throw new Error(`Lead Repository getUsers Method : ${error}`);
  }
}

async function addLead(request) {
  try {
    const newProduct = new Users(request.body);
    return await newProduct.save();
  } catch (error) {
    throw new Error(`Lead Repository addLead Method : ${error}`);
  }
}

module.exports = {
  getLead: leadRetrive,
  saveLead: addLead,
};
