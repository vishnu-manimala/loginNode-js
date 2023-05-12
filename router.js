let express = require('express');
let router = express.Router();

const credentials = {
    email : "admin@gmail.com",
    password :"admin123"
}


router.use((req, res, next)=>{
    res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
})

//user login
router.post('/login',(req,res)=> {
    if(req.body.email == credentials.email && req.body.password == credentials.password){
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');

        // res.end("login success");
    } else {
        //res.send('invalid Username or password');
        res.render('base',{tittle:"Express",access:"invalid Username or password"})
    }
}); 

//dashboard router
router.get('/dashboard',(req,res)=>{
    if(req.session.user)
    {
        res.render('dashboard', {user:req.session.user});
    } else {
        // res.send("unauthorised user");
        res.render('base',{tittle:"Express", access:"Unauthorised user"})
    }
})
//logout router
router.get('/logout',(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error");
        }else {
            res.render('base',{tittle:"Express", logout:"logout Successfully"})
        }
    });
})
module.exports = router;