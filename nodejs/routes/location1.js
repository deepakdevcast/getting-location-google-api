const express = require('express');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const router = express.Router();

const url = '???';
const client = new MongoClient(url);
const localStorage = {
    locations: []
}

router.post('/add-location', (req, res, next) => {
    client.connect(function (err, client) {
        const db = client.db('locations');
        db.collection('user-locations').insertOne({
            address: req.body.address,
            coods: { lat: req.body.lat, lng: req.body.lng }
        }, function (err, r) {
            res.json({ message: "stored the location", userId: r.insertedId });
        });
    });
    // const id = Math.random();
    // localStorage.locations.push({
    //     id: id,
        
    // });
    
});

router.get('/location/:lid', (req, res, next) => {
    const locationId = +req.params.lid;
    console.log(locationId);
    const location = localStorage.locations.find(loc => {
        return loc.id === locationId;
    });
    console.log(location);
    if (!location) {
        return res.status(404).json({ message: 'Not Found' });
    }
    res.json({
        address: location.address,
        coordinates: location.coods
    })
})

module.exports = router;

// mongodb+srv://deepak:<password>@cluster0-o4uez.mongodb.net/test?retryWrites=true&w=majority
