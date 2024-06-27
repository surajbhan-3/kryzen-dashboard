const {prisma } = require("../config/db.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config()

const saltRounds = Number(process.env.SALTROUNDS);
const secret = process.env.SECRET;


 const registerUser = async(req,res)=>{
      const {username, email, password} = req.body;
      console.log(req.body)


     try {
         const isUserPresent = await prisma.user.findUnique({
            where: {email:email}
         })
         console.log(isUserPresent,'sfsklj')

         if(isUserPresent){
            return res.status(400).send({result:false, message:"The email id already register please log in"})
         }

         const hashPassword = await bcrypt.hash(password,saltRounds);

         const  createUser = await prisma.user.create({
            data:{
                 username:username,
                 email:email, 
                 password:hashPassword}
        })

        return res.status(200).send({data:createUser, message:"User has been registered", result:true})


     } catch (error) {
        return res.status(500).send({message:"Internal Server Error", Error:error.message})
     }

}

const userLogin = async(req,res)=>{
    const {email, password} = req.body; 

     try {
         const isUserPresent = await prisma.user.findUnique({where:{email:email}})


          if(!isUserPresent){
            return res.status(404).send({message:"User does not exist Please regiser first", result:false})
          }

          const verifyPassword = await bcrypt.compare(password, isUserPresent.password)
          if(!verifyPassword){
            return res.status(401).send({message:"Invaid credentials", result:false})
          }
          const token = jwt.sign({userId:isUserPresent.id, email:isUserPresent.email, user:isUserPresent.username}, secret, {expiresIn:"7d"})
          return res.status(200).send({message:"User loged in successfully", Token:token, userId:isUserPresent.id, user:isUserPresent.username, result:true })
     } catch (error) {
        return res.status(500).send({message:"Internal Server Error", Error:error.message})

     }
}

module.exports = {registerUser,userLogin}