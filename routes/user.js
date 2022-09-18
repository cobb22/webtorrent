const { isvalid } = require('../middleware/user')
const User = require('../models/user')
const router = require('express').Router()

router.post('/login', async (req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({ msg: "All fields are required." })
        return
    }
    try {
        const resp = await User.findOne({ role: 'admin', email: req.body.email, password: req.body.password })
        if (!resp) {
            res.json({ msg: "Invalid credentials" })
        } else {
            res.json({ success: true, data: resp, msg: "Login success" })
        }
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error", err: err })
    }
})


router.post('/search', isvalid, async (req, res) => {
    if (!req.body.query) {
        return res.json({ msg: "Query missing" })
    }
    try {
        const response = {
            msg: "Unauthorized app found."
        }
        const data = await response.json()
        res.json({ data: data, success: false })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error", err: err })
    }
})

router.post('/search_detail', isvalid, async (req, res) => {
    if (!req.body.id) {
        return res.json({ msg: "Id missing" })
    }
    try {
        const resp = {
            msg: "Unauthorized app found."
        }
        const data = await resp.json()
        res.json({ data: data, success: false })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error", err: err })
    }
})


// changing password 
router.post('/change_pw', isvalid, async (req, res) => {
    try {
        const resp = await User.findOneAndUpdate({
            password: req.body.password,
            email: req.body.email
        })
        res.json({ success: true, msg: "Updating success." })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error", err: err })
    }
})

// getting email 
router.get('/get_email', isvalid, async (req, res) => {
    try {
        const resp = await User.findOne({ role: 'admin' })
        res.json({ success: true, data: resp.email })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error", err: err })
    }
})


// installing 
router.post('/install_app', async (req, res) => {
    try {
        if (!req.body.email || !req.body.password) {
            return res.json({ success: false, msg: "Please send all required details" })
        }
        const resp = await User.findOne({ role: 'admin' })
        if (resp) {
            res.json({ success: false, msg: "Admin already created" })
            return
        }
        const save = await User({
            email: req.body.email,
            password: req.body.password,
            role: 'admin'
        })
        await save.save()
        res.json({ success: true, msg: "Admin has been created you are good to go now." })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error", err: err })
    }
})

// check install 
router.get('/check_install', async (req, res) => {
    try {
        const resp = await User.findOne({ role: 'admin' })
        if (resp) {
            return res.json({ install: true })
        }
        res.json({ install: false })
    } catch (err) {
        console.log(err)
        res.json({ msg: "Server error", err: err })
    }
})


module.exports = router