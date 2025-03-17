const express = require('express');
const router = express.Router()

const MenuItem = require('../models/Person')


router.post('/', async (req, res) => {

    try {

        const data = req.body;
        const newMenu = new MenuItem(data)

        const response = await newMenu.save();
        console.log('Data saved', response);
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interval server error' })

    }

})

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Data fetched succesfully");
        res.status(200).json(data)


    } catch (error) {
        console.log(error);
        res.status(500).json(data)

    }
})


router.get('/:tasteType', async (req, res) => {
    const tasteType = req.params.tasteType.toLowerCase();
    try {
        if (['sweet', 'spicy', 'sour'].includes(tasteType)) {
            const response = await new MenuItem.find({ taste: new RegExp(`^${tasteType}$`, 'i') })
            console.log('Data fetched', response);
            res.status(200).json(response)

        } else {
            res.status(404).json("Invalid taste type")
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })

    }

})

// export for another folder 
module.exports = router; 