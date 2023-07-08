const mongoose = require('mongoose');
// if i require mongoose two times, then at second time it will reuse instance of the first one.

const contactschema = new mongoose.Schema({
    name:{   // here name and phone are field, 
        type:String,
        required:true // this means that it is mandatory to fill.
    },
    phone:{
        type:String,
        required:true
    }
});
const Contact = mongoose.model('Contact', contactschema); // this 'Contact' is the name which we give to our collection in database.
// above syntax is for compling our schema into model.
// we will export this contact and use it in index.js to access our database.
module.exports = Contact; 