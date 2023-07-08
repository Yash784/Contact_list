const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contacts_list_db'); // here 'contacts_list_db' is the name of our database.
// above we connect mongoose to the database
const db = mongoose.connection; // here this 'db' will be used for accessing data bases.
// above is acquire the connection (to check if it is successful)
db.on('error' , console.error.bind(console, 'error connecting to db'));

db.once('open' ,function(){ // this will function will happen when the connection is open for me to interact with the database.
    console.log('succesfully connected to the database.');
});