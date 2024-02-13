const Creature = require("../models/Creature")

exports.createCreature = (body) => { return Creature.create(body) }