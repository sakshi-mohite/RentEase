const  express = require("express");
const router=express.Router();

//POSTS
//index 
router.get("/",(req,res)=>{
    res.send("Get for post");
});

//show 
router.get("/:id",(req,res)=>{
    res.send("Get for  post id");
});


//post
router.post("/",(req,res)=>{
    res.send("post for post");
});


//delete
router.delete("/:id",(req,res)=>{
    res.send("delete for post id");
});

module.exports=router;