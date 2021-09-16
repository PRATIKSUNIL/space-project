const express=require('express');
const app= express();
const port=3000;
const path=require('path');

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

const bodyparser=require('body-parser');
app.use(bodyparser.urlencoded({extended : true }));

app.use(express.static('data'));

app.listen(port,() => console.log("Server online at port",port));


//Login & Sign up Pages...
app.post('/signup',function(req,res){
    var {email,username,password,confirmpassword} = req.body;
    var error;
    if(!email || !username || !password || !confirmpassword)
    {
        error="Please Fill All The Fields...";
        return res.render('signup',{'error':error});
    }
    else
    {
        if(password!=confirmpassword)
        {
            error="Passwords Ain't Matching , Please Retry....";
            return res.render('signup',{'error':error});
        }
        user.findOne({ email : email},function(err,data){
            if(err)
            {
                error="Server is Busy. Please Try After Sometime.";
                return res.render('signup',{'error':error});
            }
            if(data){
                console.log('User Already Exist.');
                error="User Already Exist with this Email , Try another one...";
                return res.render('signup',{'error':error});
            }
            else
            {
                user({
                    email,
                    username,
                    password,
                }).save((err,data) =>{
                    if(err)
                    {
                        error="Server is Busy. Please Try After Sometime.";
                        return res.render('signup',{'error':error});
                    }
                    var success="Registered Successfully. Login To Continue... "
                    return res.render('login',{'success':success});
                })
            }
        })

    }  
});



app.post('/login',function(req,res){
    var error;
    var {email,password}=req.body;
    if(!email || !password)
    {
        error="Please Fill All The Fields...";
        return res.render('login',{'error':error});
    }
    user.findOne({ email : email,
                password : password
    },function(err,data){
        if(err)
        {
            error = 'Server is Busy. Please Try After Sometime.';
            return res.render('login',{'error': error});
        }
        if(data)
        {
              return res.render('home');  
        }
        error = 'You have Entered Wrong Email or Password. Please try Again';
        return res.render('login',{'error': error});
    });
});





//Contact Us Page....
app.post('/contact',function(req,res){
    var {name,email,subject,message} = req.body;
    var error;
    if(!name || !email || !subject || !message)
    {
        error="Please Fill All The Fields...";
        return res.render('contact',{'error':error});
    }
    contactuser({
        name,
        email,
        subject,
        message
    }).save((err,data) =>{
        if(err)
        {
            error="Server is Busy. Please Try After Sometime.";
            return res.render('contact',{'error':error});
        }
        var success="Thank You for Contacting Us. Our Team will look into your matter as soon as possible.";
        return res.render('contact',{'success':success});
    })
});



//Routes for All the Pages....
app.get('/',function(req,res){
    console.log("Sign Up Page rendered successfully....");
    return res.render('signup');
});

app.get('/signup',function(req,res){
    console.log("Sign Up Page rendered successfully....");
    return res.render('signup');
});

app.get('/login',function(req,res){
    return res.render('login');
});

app.get('/home',function(req,res){
    console.log("Home Page rendered successfully....");
    return res.render('home');
});


app.get('/about',function(req,res){
    console.log("About section rendered succesfully....");
    return res.render('about');
})

app.get('/projects',function(req,res){
    console.log("Projects rendered successfully....");
    return res.render('projects');
});

app.get('/project1',function(req,res){
    console.log("Project1 rendered successfully....");
    return res.render('project1');
});

app.get('/blog',function(req,res){
    console.log("Blog page rendered successfully....");
    return res.render('blog');
});

app.get('/blog1',function(req,res){
    console.log("blog1 rendered successfully....");
    return res.render('blog1');
});

app.get('/contact',function(req,res){
    console.log("contact rendered successfully....");
    return res.render('contact');
});






//Connecting Database
const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://Admin:COSMOS@cluster0.ny2cm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser : true,
    useUnifiedTopology : true,
}).then(function(){
    console.log("Database Connected.");
});

const userschema =new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    username : {
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
});
const user=new mongoose.model('user',userschema);

const contactschema =new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
    },
    subject:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
});
const contactuser=new mongoose.model('contactuser',contactschema);