const Creature = require("../models/Creature");
const User = require("../models/User");

exports.createCreature = async (body, userId) => {
    await Creature.create(body);
    const creature = await Creature.findOne({ owner: userId })
    await User.findByIdAndUpdate(userId, { $push: { createdPosts: creature._id } })
    return
}

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