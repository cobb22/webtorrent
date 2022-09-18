// 'use strict'
const WebTorrent = require('webtorrent')
const fs = require('fs')
const torrentId = process.argv[2]
console.log('Torrent Id:- \t' + torrentId)

const client = new WebTorrent()

client.add(torrentId, torrent => {
    const files = torrent.files
    let length = files.length
    console.log("Number of files:- \t" + length)
    let interval = setInterval(() => {
        console.log("Progress: " + (torrent.progress * 100).toFixed() + "%")
    }, 5000); // 5 sec
    files.forEach(file => {
        const source = file.createReadStream()
        const destination = fs.createWriteStream(file.name)
        source.on('end', () => {
            console.log("file: \t\t", file.name)
            length -= 1
            if (!length) {
                process.exit
                clearInterval(interval)
                console.log('process has been done')
            }
        }).pipe(destination)
    })
})