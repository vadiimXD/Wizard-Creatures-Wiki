const router = require("express").Router();

//here need to be controllers for routing 
//EXAMPLE

const staticController = require("./controller/staticController")



//app use routes

//EXAMPLE
router.use(staticController)



//for other all
router.all("*", (req, res) => {
    res.render("404", { layout: false })
})

module.exports = router