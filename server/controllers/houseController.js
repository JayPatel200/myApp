const House = require("../model/Houses");
const User = require("../model/User");

const getAllHouses = async (req, res) => {
  const houses = await House.find();
  if (!houses) return res.status(204).json({ message: "No houses found" });
  res.json(houses);
};

const createNewHouse = async (req, res) => {
  const { house, owner } = req.body;
  if (!house || !owner)
    return res
      .status(400)
      .json({ message: "House name & owner are required." });

  const foundHouse = await House.findOne({
    allowedHouses: house,
  }).exec();
  if (foundHouse) {
    //Conflict
    return res.sendStatus(409).json({ message: `House ${house} already exists.` });
  }
  try {
    //Same house doesnt exist

    //checks if the user is new and doesnt exist in the House db
    const result = await House.findOne({
      username: owner,
    }).exec();

    //if exists then add the house to the list of ownedHouses and allowedHouses
    if (result) {
      await House.updateOne(
        { username: owner },
        { $push: { allowedHouses: house, ownedHouses: house } }
      ).exec();
    }
    //if does not exists then create
    else {
      await House.create({
        username: owner,
        allowedHouses: [house],
        ownedHouses: [house],
      });
    }
    res.status(201).json({ success: `New house ${house} added!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteHouse = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "House name required" });
  const house = await House.findOne({ houseName: req.body.id }).exec();
  if (!house) {
    return res
      .status(204)
      .json({ message: `House name ${req.body.id} not found` });
  }
  const result = await House.deleteOne({ houseName: req.body.id });
  res.json(result);
};

const addTenant = async (req, res) => {
  const { username } = req.body;
  if (!req?.params?.id)
    return res.status(400).json({ message: "Housename required" });
  try {
    //checks if the user is new and doesnt exist in the House db
    const result = await House.findOne({
      username: username,
    }).exec();

    //if exists then add the house to the list of ownedHouses and allowedHouses
    if (result) {
      //add a check if the tenant is already added in the house
      result = await House.updateOne(
        { $push: { allowedHouses: req.params.id } },
        { $push: { ownedHouses: req.params.id } }
      );
    }
    //if does not exists then create
    else {
      //if there is no user with that username then send an error in response
      if (!(await User.findOne({ username: username }).exec())) {
        return res
          .status(400)
          .json({ message: `User with username ${username} doesn't exist` });
      }
      result = await House.create({
        username: owner,
        allowedHouses: [req.params.id],
        ownedHouses: [req.params.id],
      });
    }
    res
      .status(201)
      .json({ success: `Tenant ${username} added to ${req.params.id}!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const removeTenant = async (req, res) => {
  const { username } = req.body;
  if (!req?.params?.id)
    return res.status(400).json({ message: "Housename required" });
  try {
    //checks if the user exists in the House db
    const result = await House.findOne({
      username: username,
    }).exec();

    //if exists then remove the house from the list of ownedHouses and allowedHouses
    if (result) {
      result = await House.updateOne(
        { $pull: { allowedHouses: req.params.id } },
        { $pull: { ownedHouses: req.params.id } }
      );
    }
    res
      .status(201)
      .json({ success: `Tenant ${username} removed from ${req.params.id}!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllHouses,
  createNewHouse,
  deleteHouse,
  addTenant,
  removeTenant,
};
