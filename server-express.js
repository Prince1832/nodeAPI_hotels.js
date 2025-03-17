const express = require('express');
const app = express();
const db = require('./db');
const Person = require('./models/Person');
const MenuItem = require('./models/MenuItem');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json())

const PORT = process.env.PORT || 3000;


/*
app.get('/', function (req, res) {
    res.send('Hello Welcome to the server!')
})

app.get('/chicken', function (req, res) {
    res.send("Sure sir, I would love to server chicken")
})
app.get('/idly', function (req, res) {
    let customise = {
        "name": 'rava-idely',
        "taste": "light-sweet",
        "chutney": "teekhi",
        "is_sambhar": true,
        "location": "Hydrabad"
    }
    res.send(customise);

    // res.send("Sure sir, I would love to server idly")
})




app.post('/mango-smoothy', function (req, res) {
    res.send('data is saved');

})
    */

/*
//POST route to add a person 
app.post('/person', function (req, res) {
    const data = req.body // Assuming the request body contains the person data

    //Create a new Person document using the Mongoose model
    // This is wrong way
    /*
    const newPerson = new Person();
    newPerson.name = data.name;
    newPerson.age = data.age;
    newPerson.mobile = data.mobile;
    newPerson.email = data.email;
    newPerson.address = data.address;
*/


// OR

//best and short way to pass all data 
// const newPerson = new Person(data);

//Save the new person to the database
// deprecated method
/*
newPerson.save((error, savedPerson)=>{
    if(error){
        console.log('Enter saving person', error);
        res.status(500).json({error: 'Interval Server error'})
        
    }else{
        console.log('Data save successfully!');
        res.status(200).json(savedPerson)
    }
})
    
})

*/

app.post('/person', async (req, res) => {

    try {

        const data = req.body;
        const newPerson = new Person(data)

        const response = await newPerson.save();
        console.log('Data saved', response);
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interval server error' })

    }

})

app.get('/person', async (req, res) => {
    try {
        const data = await Person.find();
        console.log("Data fetched succesfully");
        res.status(200).json(data)


    } catch (error) {
        console.log(error);
        res.status(500).json(data)

    }
})


app.get('/person/:workType', async (req, res) => {
    try {
        const workType = req.params.workType.toLowerCase();
        if (['frontend developer', 'teacher', 'manager'].includes(workType)) {
            const response = await Person.find({ work: new RegExp(`^${workType}$`, 'i') });
            console.log('response fetched', response);
            res.status(200).json(response)

        } else {
            res.status(404).json({ error: "Invalid work type" })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Interval server error' })

    }
})


app.post('/menuItem', async (req, res) => {

    try {

        const data = req.body;
        const newMenuItem = new MenuItem(data)

        const response = await newMenuItem.save();
        console.log('Data saved', response);
        res.status(200).json(response)

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Interval server error' })

    }

})

app.get('/menuItem', async (req, res) => {
    try {
        const data = await MenuItem.find();
        console.log("Data fetched succesfully");
        res.status(200).json(data)


    } catch (error) {
        console.log(error);
        res.status(500).json(data)

    }
})


app.get('/menuItem/:tasteType', async (req, res) => {
    const tasteType = req.params.tasteType.toLowerCase();
    try {
        if (['sweet', 'spicy', 'sour'].includes(tasteType)) {
            const response = await MenuItem.find({ taste: new RegExp(`^${tasteType}$`, 'i') })
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


// Import the router files
const personRouter = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes')

// Use the routers
app.use('/person', personRouter)
app.use('/menuItem', menuItemRoutes)



app.get('/', function (req, res) {
    res.send('Hello Welcome to the server!')
})
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));