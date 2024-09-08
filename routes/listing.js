const  express = require("express");
const router = express.Router();
const wrapAsync =require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} =require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer  = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.get("/filter/:id", wrapAsync(listingController.filter));                              //Filter Route-----------------

router.get("/search", wrapAsync(listingController.search))                                  //SEARCH Route-------------

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
   
    upload.single('listing[image][url]'),
    validateListing,
    wrapAsync(listingController.createListing)
  );
  // .post( upload.single('listing[image][url]'),(req,res)=>{
  //   res.send(req.file);
  // });

//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm);

router.route("/:id")
  .get(
  wrapAsync(listingController.showListing))
  .put(isLoggedIn,
    isOwner, 
    upload.single('listing[image][url]'),
    validateListing ,
    wrapAsync(listingController.updateListing))
  .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)
);

//index route
// router.get("/",wrapAsync(listingController.index));
  
 //Show Route
// router.get(
//     "/:id"
//     , wrapAsync(listingController.showListing));

    //Create Route
// router.post("/" ,isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    
  //   //Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
    
  //   //Update Route
  // router.put("/:id",isLoggedIn,isOwner, validateListing ,wrapAsync(listingController.updateListing));
    
    // app.put("/listings/:id", async (req, res) => {
    //   let { id } = req.params;
    //   try {
    //     let updateData = {
    //       ...req.body.listing,
    //       url: req.body.listing.image.url // Explicitly handle the URL field
    //     };
    //     let updatedListing = await Listing.findByIdAndUpdate(id, updateData, { new: true });
    //     console.log(updatedListing);
    //     res.redirect(`/listings/${id}`);
    //   } catch (error) {
    //     console.error("Error updating listing:", error);
    //     res.status(500).send("Error updating listing.");
    //   }
    // });  
    
  //   //Delete Route
  // router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports=router;