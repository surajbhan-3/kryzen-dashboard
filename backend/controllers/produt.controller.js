const {prisma } = require("../config/db.js")

const addProduct = async(req,res)=>{
    const {name, image,price,type,description, settime}=req.body;
    const {user} = req.params;
    const authenticatedUser = req.body.user
    const userId = req.body.userId
console.log(type, "types")
    try {

        if(authenticatedUser !== user){
            return res.status(404).send({"message":"user does not exist","result":false})
        }
        let convertType = type.toLowerCase()
        const validateType = ["electronics", "clothing", "books"]
        if(!validateType.includes(convertType)){
            return res.status(400).send({"message":"Invalid product type", "result":false})

        }

        function capitalizeEachWord(str) {
            let words = name.split(' ');
            words = words.map(word => {
              return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
            });
          
            return words.join(' ');
          }
       if(settime){
        res.status(200).send({ message: 'Your product is added to the queue and will be processed shortly', flag:true, result: true });
        setTimeout(async()=>{
         try {
           
            const checkProductName = await prisma.product.findMany({where:{type:convertType,name:name}})
            console.log(checkProductName)
        
               if(checkProductName.length>0){
                return res.status(401).json({"message":"Name and should be unique"})
               }
    

            const newProduct = await prisma.product.create({
                data:{
                    name:capitalizeEachWord(name),
                    image,
                    price:parseInt(price),
                    type:convertType,
                    description,
                    userId:parseInt(userId)
                }
            })
            console.log({data:newProduct, message:'data created succesffuly', result:true})
         } catch (error) {
            console.error('Error creating product:', error);

         }
        },parseInt(settime)*60*1000)

       }else{

        const checkProductName = await prisma.product.findMany({where:{type:convertType,name:name}})
        console.log(checkProductName)
    
           if(checkProductName.length>0){
            return res.status(401).json({"message":"Name and should be unique"})
           }

        const newProduct = await prisma.product.create({
            data:{
                name:capitalizeEachWord(name),
                image,
                price:parseInt(price),
                type:convertType,
                description,
                userId:parseInt(userId)
            }
        })
    
        res.status(201).send({data:newProduct, message:'data created succesffuly', result:true})
       }



    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                "message":'Name and Price should be unique',
                "Error":error.message,
                "result":false
            })
            
    }


}

const editProduct = async(req,res)=>{
  
    const {name, image,price,type, description}=req.body;
    const {user,id, title} = req.params;
    const userId=req.body.userId
    const authenticatedUser = req.body.user
    try {
        if(authenticatedUser !== user){
            return res.status(403).send({"message":"Forbidden:Action is not allowed","result":false})
        }

        const validateType = ["electronics", "clothing", "books"]
        if(!validateType.includes(type)){
            return res.status(400).send({"message":"Invalid product type", "result":false})
        }

        const product = await prisma.product.findUnique({where:{id:parseInt(id), name:title,}})
        if(!product){
            return res.status(404).send({"message":"Product is not available", "result":false})
        }

        const updateProduct = await prisma.product.update({where:{userId:parseInt(userId),id:parseInt(id)},
            data:{
                name:name || product.name,
                image:image|| product.image,
                price:parseInt(price) || product.price,
                type:type || product.type,
                description:description || product.description
            }
        })

        res.status(201).send({message:'data created succesffuly', result:true})

    } catch (error) {
        res.status(500).send(
            {
                "message":"Internal Server Error",
                "Error":error.message,
                "result":false
            })
    }


    
}

const deleteProduct = async(req,res)=>{
console.log("heool")
    const {user,id} = req.params;
    const authenticatedUser = req.body.user
    const userId = req.body.userId
    try {
        if(authenticatedUser !== user){
            return res.status(403).send({"message":"Forbidden:Action is not allowed","result":false})
        }
        console.log(userId, id)
        const productDelete = await prisma.product.delete({
            where:{
                userId:parseInt(userId), 
                id:parseInt(id),
               
            }
        })
        return res.status(204).send({"message":"Product Deleted successfully", result:true})
    }
    catch(error){
        res.status(500).send(
            {
                "message":"Internal Server Error",
                "Error":error.message,
                "result":false
            })

    }



}


const filterProductByCategory = async(req,res)=>{
// filter done using react
    const {user,category} = req.params;
    const authenticatedUser = req.body.user
    const userId = req.body.userId
    try {
        if(authenticatedUser !== user){
            return res.status(403).send({"message":"Forbidden:Action is not allowed","result":false})
        }
        const filterProduct = await prisma.product.findMany({
            where:{
                userId:parseInt(userId),
                type:category
                
            }
        })

        return res.status(200).send({"data":filterProduct,"message":"Product Deleted successfully", result:true})
    }
    catch{
        res.status(500).send(
            {
                "message":"Internal Server Error",
                "Error":error.message,
                "result":false
            })

    }

    
}

const sortProduct = async(req,res)=>{
 // created this functionality in frontend
}

const getSingleProduct = async(req,res)=>{
    const {id, user, title}=req.params
    const authenticatedUser = req.body.user
    const userId = req.body.userId
   try {
    if(authenticatedUser !== user ){
        return res.status(403).send({"message":"Forbidden:Action is not allowed","result":false})
    }
    const singleProduct= await prisma.product.findUnique({where:{id:parseInt(id),name:title}})
    res.status(201).send({data:[singleProduct], message:'Single product fetch succesffuly', result:true})

   } catch (error) {
  
    res.status(500).send(
        {
            "message":"Internal Server Errer",
            "Error":error.message,
            "result":false
        })
   }
    
}

const getAllProduct = async(req,res)=>{
    const {user}=req.params
    const authenticatedUser = req.body.user
    const userId = req.body.userId;
    console.log(authenticatedUser, "auuser", userId)
   console.log(user, 'user ')
   try {
    if(authenticatedUser !== user){
        console.log(authenticatedUser, user, "hello")
        return res.status(403).send({"message":"Forbidden:Action is not allwed","result":false})
    }
    const allProduct= await prisma.product.findMany({where:{userId:parseInt(userId)}})
    res.status(201).send({data:allProduct, message:'all product fetch succesffuly', result:true})

   } catch (error) {
    console.log(error)
    res.status(500).send(
        {
            "message":"Internal Server Errer",
            "Error":error.message,
            "result":false
        })
   }
    
}






module.exports ={
    addProduct,
    editProduct,
    deleteProduct,
    filterProductByCategory,
    sortProduct,
    getSingleProduct,
    getAllProduct
}