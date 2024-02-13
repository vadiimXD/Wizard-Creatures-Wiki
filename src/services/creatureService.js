const Creature = require("../models/Creature")

exports.createCreature = (body) => { return Creature.create(body) }

exports.getAllCreatures = () => { return Creature.find() }