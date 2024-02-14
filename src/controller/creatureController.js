const router = require("express").Router()
const creatureService = require("../services/creatureService")
const { isAuth } = require("../middlewares/authMiddlewares")
const { getErrorMessage } = require("../utils/errorUtils")
const { isOwner } = require("../services/userService")

router.get("/create", isAuth, (req, res) => {
    res.render("create", { layout: false })
})

router.post("/create", isAuth, async (req, res) => {
    try {
        req.body.owner = req.user.userId
        await creatureService.createCreature(req.body, req.user.userId)
        res.redirect("/posts")
    } catch (error) {
        const errorMess = getErrorMessage(error);
        res.render("create", { layout: false, error: errorMess, body: req.body })
    }
})

router.get("/posts", async (req, res) => {
    try {
        const creatures = await creatureService.getAllCreatures().lean()
        res.render("all-posts", { layout: false, creatures })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.get("/details/:creatureId", async (req, res) => {
    try {
        const creature = await creatureService.getOneCreature(req.params.creatureId).populate("owner").populate("votes").lean()
        const isOwner = creature.owner._id == req.user?.userId
        const isVoted = creature.votes.filter(x => x._id == req.user?.userId)
        const voteList = creatureService.getVoteList(creature.votes)

        res.render("details", { layout: false, creature, isOwner, isVoted, voteList })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.get("/vote/:creatureId", isAuth, async (req, res) => {
    try {
        await creatureService.voteForCreature(req.params.creatureId, req.user.userId)
        res.redirect(`/details/${req.params.creatureId}`)
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.get("/edit/:creatureId", isAuth, isOwner, async (req, res) => {
    try {
        const creature = await creatureService.getOneCreature(req.params.creatureId).lean()
        res.render("edit", { layout: false, creature })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

router.post("/edit/:creatureId", isAuth, isOwner, async (req, res) => {
    try {
        await creatureService.updateCreature(req.params.creatureId, req.body)
        res.redirect(`/details/${req.params.creatureId}`)
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("edit", { layout: false, error: errorMess, creature: req.body })
    }
})

router.get("/delete/:creatureId", isAuth, isOwner, async (req, res) => {
    try {
        await creatureService.deleteCreature(req.params.creatureId)
        res.redirect("/posts")
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})


module.exports = router