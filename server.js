const express = require("express");
const path = require("path");
const app = express();
const session = require("express-session");
const {v4:uuidv4} = require("uuid");
const router = require("./router");
const PORT = 7000; //sets port to 3000 or envirnment variable



app.use(express.json());//to parse incoming request bodies in json
app.use(express.urlencoded({extended:true}))//to parse incoming requests in url encoded

app.set('view engine', 'ejs');//setting view engine to ejs!

app.use('/static', express.static(path.join(__dirname,'public')));
app.use('/asset', express.static(path.join(__dirname,"/public/asset")));

app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}));

app.use('/route',router);
//home route
app.get('/',(req,res)=> {
    if(req.session.user){
        res.redirect("/route/dashboard")
    } else {
        res.render('base',{title:"Login"});
    }
})

app.listen(PORT,()=>{
    console.log(`listening on server ${PORT}`);
});












// const EventEmiter = require("events")
// const event = new EventEmiter()

// event.on("foo", (req, res)=>{

// })

// event.emit("foo")

// const errorHandl = (err, req, res, next)=>{
//     const statusCode = res.statusCode ? res.statusCode : 500
//     switch(statusCode){
//         case 404:

//     }
// }


// res.status(404)
// throw new Error("Page not found")