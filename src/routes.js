const router = require("express").Router();

//here need to be controllers for routing 
//EXAMPLE

const secondController=require("./controller/test2Controller")



//app use routes

//EXAMPLE

router.use(secondController)



//for other all
router.all("*", (req, res) => {
    res.send("404")
})

module.exports = router