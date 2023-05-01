const {Router} = require("express");
const {Owner, Dog} = require("../models/Schemas");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

const router = Router();

router.get("/seed", async (req, res) => {
  dogs = [{name: "Rover"}, {name: "Spot"}, {name: "Biff"}];
  owners = [{name: "John"}, {name: "Stacy"}, {name: "Josie"}];

  const newDogs = await Dog.create(dogs);
  const newOwners = await Owner.create(owners);

  res.json({newDogs, newOwners});
});

router.get("/adopt/:dog/:owner", async (req, res) => {

  const owner = new toId(req.params.owner);
  console.log(owner);
  const dog = await Dog.findById(req.params.dog);
  dog.owner = owner;
  dog.save();
  res.json(dog);
});

router.get("/see", async (req, res) => {
  console.log(toId);
  const dogs = await Dog.find({}).populate({path: "owner", model: "Owner"});

  res.json(dogs);
});

module.exports = router;