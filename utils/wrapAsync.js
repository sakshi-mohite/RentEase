// function wrapAsync(fn){
//     return function(req,res,next){
//         fn(req,res,next).catch(next);
//     }
// } 
//OR we can write as follow

module.exports=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(next);
    }
};