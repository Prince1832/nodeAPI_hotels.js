// function add(a, b) {
//     return a + b
// }

// var result = add(3, 4)
// console.log(result);


// (function () {
//     console.log("arham is added");

// })()



/*
function callback(){
    console.log("Prince is callback function");

}

const add = function (a, b, callback) {
    var result = a + b;
    console.log(result);

}
add(5, 7, callback)
callback()

*/



/*
function add(a, b, callback) {
    let result = a + b;
    console.log(result);

    callback();
}

// add(5, 9, function() {
//     console.log("Callback function executed!");
// });

add(5, 19, ()=>{console.log("Callback function executed!")});
*/



// React uses of Node.js
/*
let fs = require('fs');
let os = require('os');


let user = os.userInfo()
console.log(user);
console.log(user.username);


fs.appendFile('greeting.txt', 'Hi' + user.username + '!\n', ()=>{console.log("file is created");
});



console.log(fs);
*/

/*
let _ = require('lodash')

const notes = require('../notes.js');

console.log('Server file is available');

let age = notes.age;
console.log(age);

let result = notes.addNumber(4, 6);
console.log(result);
*/

// Lodash using for filter out the unique element from an ARRAY
// let data = ["person", "person", 1, 2, 3, 4, 5, 5, "2", "name", "age", 2, 4];
// let filter = _.uniq(data);
// console.log(filter);

// normal js
// let data = ["person", "person", 1, 2, 3, 4, 5, 5, "2", "name", "age", 2, 4];

// let uniqueData = Array.from(new Set(data));
// console.log(uniqueData);

// OR



/*
let data = ["person", "person", 1, 2, 3, 4, 5, 5, "2", "name", "age", 2, 4];


let uniqueData = data.filter((value, index, self) => {
    return self.indexOf(value) === index;
})

console.log(uniqueData);
*/





const jsonString = `{
    "name": "Arham Mansuri",
    "age": 25,
    "email": "arham@example.com"
}`;

const jsonObject = JSON.parse(jsonString);
console.log(jsonObject);
console.log(jsonObject.name);




const jsonStringObject = {
    "name": "Arham Mansuri",
    "age": 25,
    "email": "arham@example.com",
    "isStudent": false,
    "skills": ["HTML", "CSS", "JavaScript", "React"],
    "address": {
        "city": "Mumbai",
        "state": "Maharashtra",
        "pincode": 400001
    }
}


const jsonStringified = JSON.stringify(jsonStringObject);
console.log(typeof (jsonStringified));



