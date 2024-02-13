const router = require("express").Router()
const creatureService = require("../services/creatureService")
const { isAuth } = require("../middlewares/authMiddlewares")
const { getErrorMessage } = require("../utils/errorUtils")

router.get("/create", isAuth, (req, res) => {
    res.render("create", { layout: false })
})

router.post("/create", isAuth, async (req, res) => {
    try {
        req.body.owner = req.user.userId
        await creatureService.createCreature(req.body)
        res.redirect("/posts")
    } catch (error) {
        const errorMess = getErrorMessage(error);
        res.render("create", { layout: false, error: errorMess, body: req.body })
    }
})
module.exports = router