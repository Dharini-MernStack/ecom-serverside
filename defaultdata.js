const Products = require ("./models/productsSchema");
const productsdata = require("./constant/productsdata");


const DefaultData = async()=>{
    try{
       await Products.deleteMany({});
       

        const storedata = await Products.insertMany(productsdata)
      console.log(storedata)  
    }catch(error){
        console.log("error" + error.message)

    }
};

module.exports = DefaultData