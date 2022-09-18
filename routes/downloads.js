const router = require('express').Router()
const { isvalid } = require('../middleware/user')
const Downloads = require('../models/downloads')
const fs = require('fs')
const path = require('path')

// downloading 
router.post('/start_download', isvalid, async (req, res) => {
    try {

        const torrentId = req.body.url
        const random = Date.now()
        const idd = torrentId + " " + random

        console.log('Torrent Id:- \t' + torrentId)


        const creating = await Downloads({
            torrent_id: idd,
            title: req.body.title
        })
        await creating.save()


    } catch (err) {
        console.log(err)
        resjsonn({ success: false, err: err, msg: "Server error" })
    }
})

// get all dwonlaods 
router.get('/get_downloads', async (req, res) => {
    try {
        const resp = await Downloads.find({ is_done: true })
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
        res.json({ success: false, err: err, msg: "Server error" })
    }
})

// get all pending downloads 
router.get('/get_pending_downloads', async (req, res) => {
    try {
        const resp = await Downloads.find({ is_done: false })
        res.json({ success: true, data: resp })
    } catch (err) {
        console.log(err)
        res.json({ success: false, err: err, msg: "Server error" })
    }
})


// get all files name 
router.get('/files', async (req, res) => {
    try {
        const files = fs.readdirSync(`${__dirname}/../client/public/torrent`)
        res.json({ data: files })
    } catch (err) {
        console.log(err)
        res.json({ success: false, err: err, msg: "Server error" })
    }
})

// deleting files 
router.post('/delete_one', isvalid, async (req, res) => {
    try {
        var filePath = `${__dirname}/../client/public/torrent/${req.body.file_name}`;
        fs.unlinkSync(filePath);

        res.json({ success: true, msg: "Files has been deleted" })
    } catch (err) {
        console.log(err)
        res.json({ success: false, err: err, msg: "Server error" })
    }
})


// deleting files 
router.post('/delete_mongo', isvalid, async (req, res) => {
    try {
        const resp = await Downloads.findOneAndDelete({ _id: req.body.id })
        if (!resp) {
            res.json({ success: false, msg: "Nothing deleted. Maybe file id is not exist in the database." })
            return
        }
        res.json({ success: true, msg: "File has been deleted" })
    } catch (err) {
        console.log(err)
        res.json({ success: false, err: err, msg: "Server error" })
    }
})


module.exports = router
