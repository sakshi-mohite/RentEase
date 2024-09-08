const  express = require("express");
const router=express.Router();

//index -users
router.get("/",(req,res)=>{
    res.send("Get for users");
});

//show -users
router.get("/:id",(req,res)=>{
    res.send("Get for  Users id");
});


//post -users
router.post("/",(req,res)=>{
    res.send("post for Users");
});


//delete -users
router.delete("/:id",(req,res)=>{
    res.send("delete for show User id");
});

module.exports=router;