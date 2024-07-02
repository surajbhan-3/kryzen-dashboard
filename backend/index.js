const express = require("express")
require("dotenv").config()
const cors = require("cors")
const {prisma} = require("./config/db")
const PORT = process.env.PORT 


const {userLogin, registerUser} = require("./controllers/user.controller")
const { AuthenticationMiddleware } = require("./middleware/Authentication.middleware")
const { addProduct, editProduct, getSingleProduct, getAllProduct, filterProductByCategory, deleteProduct } = require("./controllers/produt.controller")


const app = express()

app.use(express.json())
app.use(cors())

console.log("hello")

app.get("/", async(req,res)=>{

    try {
        res.status(200).send("Welcome to the Backend of Lms")
    } catch (error) {
        res.status(500).send(
            {
                "message":"Internal Server Errer",
                "Error":error.message,
                "result":false
            }
        )
    }
})

app.post("/api/user/register_user", registerUser );
app.post("/api/user/login", userLogin )



app.post("/api/product/:user/add_product", AuthenticationMiddleware, addProduct);
app.patch("/api/product/:user/update_product/:id/:title",AuthenticationMiddleware, editProduct);
app.get("/api/product/:user/single_product/:id/:title",AuthenticationMiddleware, getSingleProduct);
app.get("/api/product/:user/all_product", AuthenticationMiddleware, getAllProduct);
app.get("/api/product/:user/filter_products/:category", AuthenticationMiddleware, filterProductByCategory);
app.delete("/api/product/:user/delete_product/:id", AuthenticationMiddleware, deleteProduct)










app.get("/", async(req,res)=>{

    try {
        res.status(200).send("Welcome to the Backend of Lms")
    } catch (error) {
        res.status(500).send(
            {
                "message":"Internal Server Errer",
                "Error":error.message,
                "result":false
            }
        )
    }
})




const checkDatabaseConnection = async () => {
    try {
      // Perform a simple query to check the connection
      await prisma.$queryRaw`SELECT 1`;
      console.log('Connected to the database');
    } catch (error) {
      console.error('Error connecting to the database', error);
      process.exit(1); // Exit the process with an error code
    }
  };
  
  // Check database connection before starting the server
  checkDatabaseConnection().then(() => {
 

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  });