const House = require("../model/Houses");

const getAllHouses = async (req, res) => {
  const houses = await House.find();
  if (!houses) return res.status(204).json({ message: "No houses found" });
  res.json(houses);
};

const createNewHouse = async (req, res) => {
  const { house, owner } = req.body;
  if (!house || !owner)
    return res.status(400).json({ message: "House name & owner are required." });

  const foundHouse = await House.findOne({
    houseName: house,
  }).exec();
  if (foundHouse) {
    //Conflict
    res.sendStatus(409).json({ message: `House ${house} already exists.` });
  }
  try {
    //Same house doesnt exist
    const result = await House.create({
      houseName: house,
      owner: owner,
    });
    res.status(201).json({ success: `New house ${house} created!` });
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

const getHouses = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "Username required" });
  const house = await House.find({ allowedUsers: req.params.id }).exec();
  if (!house) {
    return res
      .status(204)
      .json({ message: `House/s for ${req.params.id} not found` });
  }
  res.json(house);
};

module.exports = {
  getAllHouses,
  createNewHouse,
  deleteHouse,
  getHouses,
};
