const  express = require("express");
const app = express();
const users=require("./routes/user.js");
const posts=require("./routes/post.js");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");
// const cookieParser=require("cookie-parser");

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("made-in","India",{signed:true});
//     res.send("signed cookie send");
// });

// app.get("/verify",(req,res)=>{
//     console.log(req.signedCookies);
//     res.send("Verified!!");
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greed","hello");
//     res.cookie("madeIn","India");
//     res.send("Send you some cookies!");
// });

// app.get("/greet",(req,res)=>{
//     let {name="anonymous"}=req.cookies;
//     res.send(`Hi , ${name}`);
// });

// app.get("/",(req,res)=>{
//     console.dir(req.cookies);
//     res.send("Hi i am root!");
// });

// app.use("/users",users);
// //-------------------------------------------------------------------------------
// app.use("/posts",users);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const sessionOptions= {
    secret:"mysupersecretstring",
    resave:false,
    saveUninitialized:true
};


app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let {name="Yash"}=req.query;
    req.session.name=name;
    if(name==="Yash"){
        req.flash("error"," User  not registered");
    }else{
        req.flash("success"," User register successfuly!");
    }
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{
    // console.log(req.flash("success"));
    res.render("Page.ejs",{name:req.session.name});
});

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count ++;
//     }else{
//         req.session.count=1;
//     }
//     res.send(`You send a request ${req.session.count} times`);
// });
// app.get("/test",(req,res)=>{
//     res.send("test successful!");
// });

app.listen(3000,()=>{
    console.log("Server is listening to 3000");
});