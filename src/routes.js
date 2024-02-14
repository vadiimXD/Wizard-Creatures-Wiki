const router = require("express").Router();

//here need to be controllers for routing 
//EXAMPLE

const staticController = require("./controller/staticController")
const authController = require("./controller/authController")
const creatureController = require("./controller/creatureController")
const profileController = require("./controller/profileController")

router.use(staticController)
router.use(authController)
router.use(creatureController)
router.use(profileController)

//for other all
router.all("*", (req, res) => {
    res.render("404", { layout: false })
})

module.exports = router