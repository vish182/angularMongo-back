const express = require("express")
const router = express.Router()
const User = require("../../model/User")

// @API    : create user
// @access : public
router.post("/", async (req, res) => {
    console.log("post request: ", req.body);
    try {
        const { name, password } = req.body
        const user = new User({
            name:name ,password:password
        })
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        console.log(error.message);
    }
})


// @API : Read from Database
// @access : public

router.get("/", async (req, res) => {
    console.log("get request:", req.body);
    try {
        const users = await User.find({})

        if (users.length == 0) {
            console.log("couldnt find");
            return res.status(400).json([]);
        }
        //console.log("sending ", users);
        return res.json({users: users})
    } catch (error) {
        console.log(error);
    }
})




// API : update user
// access: public

router.put("/:id", async (req, res) => {
    console.log("put", req.params.id);
    try {

        const { name, password } = req.body

        let user = await User.findByIdAndUpdate(req.params.id, { name, password }, { new: true })

        if (!user) {
            return res.status(400).json({ msg: "user does not exists" })
        }

        return res.json({"upadated user" : user})

    } catch (error) {
        console.log(error)
    }
})

// API : delete  user
// access: public


router.delete("/:id", async (req, res) => {
    console.log("delete", req.params.id);
    try {
        let user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(400).json({ msg: "user does not exists" })
        }

        return res.json({"deleted user" : user})

    } catch (error) {
        console.log(error)
    }
})

module.exports = router