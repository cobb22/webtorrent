const mongoose = require('mongoose')

const downloadsSchema = new mongoose.Schema({
    name: {
        type: Array
    },
    percentage: {
        type: String
    },
    is_done: {
        type: Boolean,
        default: false
    },
    torrent_id: {
        type: String
    },
    title: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Downloads', downloadsSchema)