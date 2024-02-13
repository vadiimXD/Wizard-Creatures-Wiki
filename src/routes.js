const router = require("express").Router();

//here need to be controllers for routing 
//EXAMPLE

const staticController = require("./controller/staticController")
const authController = require("./controller/authController")
const creatureController = require("./controller/creatureController")

router.use(staticController)
router.use(authController)
router.use(creatureController)

//for other all
router.all("*", (req, res) => {
    res.render("404", { layout: false })
})

module.exports = router