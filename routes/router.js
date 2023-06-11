const express = require("express");
const router = new express.Router();
const Products = require("../models/productsSchema");
const USER = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")


//getting products data API
router.get("/getproducts", async (req, res) => {
  try {
    const productsdata = await Products.find()
    console.log("console the data" + productsdata)
    res.status(201).json(productsdata);
  } catch (error) {
    console.log("error" + ":" + error.message)

  }
});

router.get("/getproductsone/:id", async (req, res) => {
  try {
    const { id } = req.params;
    //console.log(id)

    const individualdata = await Products.findOne({ id: id });
    //   console.log(individualdata +"individual data")
    res.status(201).json(individualdata)

  } catch (error) {
    res.status(400).json(individualdata);
    console.log("error" + ":" + error.message)

  }
});


// Registering data

router.post("/register", async (req, res) => {
  //console.log(req.body);

  const { fname, email, number, password, passwordagain } = req.body;
  if (!fname || !email || !number || !password || !passwordagain) {
    res.status(422).json({ error: "FILL ALL THE DATA" });
    console.log("NO DATA AVAILABLE");

  }
  try {
    const preuser = await USER.findOne({ email: email });
    if (preuser) {
      res.status(422).json({ error: "THIS USER IS ALREADY REGISTERED" });

    } else if (password !== passwordagain) {
      res.status(422).json({ error: "PASSWORD AND CONFIRM PASSWORD DOESNT MATCH" });

    } else {
      const finalUser = new USER({
        fname, email, number, password, passwordagain

      });
      //Encrypting password and password again
      //pasword hashing



      const storedata = await finalUser.save();
      console.log(storedata);

      res.status(201).json(storedata);
    }
  } catch (error) {

  }
})

//log in user Api

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Fill all the field" })
      ;
  }
  try {
    const userlogin = await USER.findOne({ email: email })
    console.log(userlogin + "user value");
    if (userlogin) {
      const isMatch = await bcrypt.compare(password, userlogin.password)
      console.log(isMatch + "passwords match");

      //token generation
      const token = await userlogin.generateAuthToken();
      console.log(token);

      res.cookie("amazonweb", token, {
        expires: new Date(Date.now() + 900000),
        httpOnly: true
      })


      if (!isMatch) {
        res.status(400).json({ error: "Password does not match" })
      } else {
        res.status(201).json(userlogin);
      }
    }
    else {
      res.status(400).json({ error: "Password does not match" })

    }

  } catch (error) {
    res.status(400).json({ error: "Invalid details" })
  }


})

//Adding items into cart
router.post("/addcart/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id)
    const cart = await Products.findOne({ id: id });
    console.log(cart + "cart value");

    const UserContact = await USER.findOne({ _id: req.userID });
    console.log(UserContact);

    if (UserContact) {
      const cartData = await UserContact.addcartdata(cart)
      await UserContact.save();
      console.log(cartData);;
      res.status(201).json(UserContact);

    } else {
      res.status(401).json({ error: "Invalid user" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid user" });
  }
})
router.get("/getproductsone/:id", async (req, res) => {

  try {
    const { id } = req.params;
    console.log(id);

    const individual = await Products.findOne({ id: id });
    console.log(individual + "ind mila hai");

    res.status(201).json(individual);
  } catch (error) {
    res.status(400).json(error);
  }
});
//get cart details
router.get("/cartdetails", authenticate, async (req, res) => {
  try {
    const buyuser = await USER.findOne({ _id: req.userID });
    res.status(201).json(buyuser);
  } catch (error) {
    console.log("error" + error)

  }
})
//get valid user
router.get("/validuser", authenticate, async (req, res) => {
  try {
    const validuserone = await USER.findOne({ _id: req.userID });
    res.status(201).json(validuserone);
  } catch (error) {
    console.log("error" + " " + error)

  }
})

// remove item from the cart

router.delete("/remove/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    req.rootUser.carts = req.rootUser.carts.filter((cruval) => {
      return cruval.id != id;
    })
    req.rootUser.save();
    res.status(201).json(req.rootUser);
    console.log("item remove")

  } catch (error) {
    console.log("error" + error)
    res.status(400).json(req.rootUser);
  }
})
//for logout of user
router.get("/lougout",authenticate,(req,res)=>{
  try{
req.rootUser.tokens = req.rootUser.tokens.filter((curelem)=>{
  return curelem.token !== req.token
})
res.clearCookie("amazonweb",{path:"/"});
req.rootUser.save();
res.status(201).json(req.rootUser.tokens);
console.log("User Logged Out")
  }catch(error){
   // res.status(01).json(req.rootUser.tokens);
   console.log("Error for User Logout")
  }
})
module.exports = router;