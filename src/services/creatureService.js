const Creature = require("../models/Creature")

exports.createCreature = (body) => { return Creature.create(body) }

exports.getAllCreatures = () => { return Creature.find() }

exports.getOneCreature = (creatureId) => { return Creature.findById(creatureId) }

exports.voteForCreature = (creatureId, userId) => { return Creature.findByIdAndUpdate(creatureId, { $push: { votes: userId } }) }

exports.getVoteList = (voteList) => {
    let emails = []
    if (voteList.length != 0) {
        voteList.map(x => emails.push(x.email))
        return emails.join(", ")
    }
    return []
}

exports.updateCreature = (creatureId, body) => { return Creature.findByIdAndUpdate(creatureId, body, { runValidators: true }) }

exports.deleteCreature = (creatureId) => { return Creature.findByIdAndDelete(creatureId) }