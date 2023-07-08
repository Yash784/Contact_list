const express = require('express');
const port = 800;
const path = require('path');

const db = require('./config/mongoose');
const Contact = require('./models/contact');
const app = express(); // this app has all the functionalities which are needed to run a server.


app.set('view engine', 'ejs');//this will set the property as'view engine' and value as 'ejs'.
app.set('views',path.join(__dirname , 'views') ); // "__dirname" will return the path from where the server is started.
// express will automatically handle 404 scenario .
app.use(express.urlencoded()); // it is a parser
// above one is a middle ware , it has access to both response and request.
// the data which the form sent is encoded, above middleware is used to decode it. It parses it for us  into
// key and values. 


// the data which the form sends to the server is encoded .

// MIDDLEWARE IS CALLED BEFORE ALL THE CONTROLLERS. They have access to both response and request.
// they are also can be used to manipulate request data and response data.

app.use(express.static('assets')); // when ever we need some static files(html, css, js files.),it automatically start search from 
// assets folder.


// app.use(function(req, res, next){  // it is middleware , and by default it takes 3 arguments "req,res,next".
//     // next is used to call next middleware if there is one.
//     console.log('middleware 1 called');
//     next();
// });
// app.use(function(req , res, next){
//     console.log("middleware 2 is called");
//     next();
// });
var contactlist = [
    {
        name:"arpan",
        phone:"1111111"
    },
    {
        name:"Tony Stark",
        phone:"123456"
    },
    {
        name:"Coding Ninjas",
        phone:"2314567"
    }
]

app.get('/', function(req , res){  // this is controller.
    // res.send('Cool , it is running');
    Contact.find({}) // in those curly brackets , that is for query ,like if want to find by name or phonenumber.
    .then(function(contacts){
        return res.render('home' ,{ // render function finds a html or ejs file and render(chala deta hai ek tarah se.) it for us.
            title:"Contacts List",// here we are giving title from js file.
            contact_list:contacts
        });
    })   
    .catch(function(err){
        console.log('Error in fetching contacts');
        return;
    });
});
    

app.get('/practice', function(req, res){
    return res.render('practice', {
        title:"Let us play with ejs"
    });
});

app.post('/create-contact', function(req, res){
    //return res.redirect('/practice'); // redirect will redirect us to the given route.
    // console.log(req.body);
    // console.log(req.body.name);
    // console.log(req.body.phone);

    // contactlist.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // contactlist.push(req.body);
    //return res.redirect('/');
    Contact.create({ name: req.body.name, phone: req.body.phone })
    .then(function(newContact) {
        console.log('**********', newContact);
        return res.redirect('back'); // this will redirect us to the previous page.
    })
    .catch(function(err) {
        console.log('error in creating a contact!');
        return;
    });
    
});
app.get('/delete-contact/' , function(req, res){
    //console.log(req.params);
    // get the id from query in the url.
    let id= req.query.id;
    // find the contact in the database using id and delete.
    // let contactIndex = contactlist.findIndex(contact=>contact.phone==phone ); // this will return the index of that phone number which we want to delete if it is present otherwise it will return -1.
    // if(contactIndex !=-1){
    //     contactlist.splice(contactIndex , 1);
    // }
    Contact.findByIdAndDelete(id)
    .then(function(){
        res.redirect('back');
    })
    .catch(function(err){
        console.log('error in deleting from the database');
    });
});
app.listen(port, function(err){
    if(err){
        console.log('error in running the server', err);
    }
    console.log('Yup, my express is running on a port :' , port);
});
