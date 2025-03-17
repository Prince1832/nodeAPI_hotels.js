const express = require('express');
const Person = require('../models/Person');
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const data = req.body.work.toLowerCase();
        const newPerson = new Person(data);
        const response = await newPerson.save()
        console.log('Data Saved');

        res.status(200).json(response)


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Interval server error" })
    }
})




router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }

})



router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase();
        if (['frontend developer', 'teacher', 'manager'].includes(workType)) {
            const response = await new Person.find({ work: new RegExp(`^${workType}$`, 'i') });
            console.log('response fetched', response);
            res.status(200).json(response)
        } else {
            res.status(404).json({ error: "Invalid work type" })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Inernal server error' })

    }
});

//Put method 
router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract the id from the URL parameter
        const updatedPersonData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            /*
            new: true का मतलब क्या है?
            डिफ़ॉल्ट रूप से, findByIdAndUpdate() पुराने डॉक्यूमेंट (अपडेट से पहले का डेटा) को रिटर्न करता है।
            लेकिन अगर हम new: true सेट करते हैं, तो यह अपडेट होने के बाद वाला नया डेटा रिटर्न करेगा।
            📌 मतलब: अपडेट के बाद का डॉक्यूमेंट मिलेगा, न कि पुराना।
            🔸 runValidators: true का मतलब क्या है?
            Mongoose स्कीमा में कुछ वैलिडेशन हो सकते हैं (जैसे required, maxlength, आदि)।
            डिफ़ॉल्ट रूप से, findByIdAndUpdate() वैलिडेशन को नहीं चलाता।
            लेकिन अगर हम runValidators: true सेट करते हैं, तो Mongoose वैलिडेशन चेक करेगा और कोई ग़लत डेटा हुआ तो एरर देगा।
            📌 मतलब: गलत डेटा अपडेट नहीं होगा, और पहले से तय वैलिडेशन नियम लागू होंगे।
            */
            new: true, // Return the updated document
            runValidators: true // Run Mongoose validation
        })

        if (!response) {
            return res.status(404).json({ error: "Person not found" })
        }

        console.log('Data updated');
        res.status(200).json(response)

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" })

    }
})


//Delete method

// Delete method
router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id;

        const deletePerson = await Person.findByIdAndDelete(personId);

        if (!deletePerson) {
            return res.status(404).json({ error: "Person not found" });
        }

        console.log("Data deleted");

        res.status(200).json({ message: "Person deleted successfully", deletePerson });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router; 