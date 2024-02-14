const router = require("express").Router();
const { isAuth } = require("../middlewares/authMiddlewares");
const userService = require("../services/userService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/profile", isAuth, async (req, res) => {
    try {
        const userInfo = await userService.getUser(req.user.userId).populate("createdPosts").lean()
        console.log(userInfo.firstName)
        res.render("my-posts", { layout: false, posts: userInfo.createdPosts, userInfo, })
    } catch (error) {
        const errorMess = getErrorMessage(error)
        res.render("404", { layout: false, error: errorMess })
    }
})

module.exports = router;