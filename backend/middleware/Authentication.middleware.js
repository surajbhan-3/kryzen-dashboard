const jwt = require("jsonwebtoken");

const AuthenticationMiddleware =  async(req,res, next)=>{

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "No token provided", result: false });
}
    const token = authHeader.split(" ")[1];
    console.log(token, 'token')
    try {
        const decodeToken = jwt.verify(token,process.env.SECRET);
        console.log(decodeToken, 'decode token')
        req.body.userId = decodeToken.userId;
        req.body.user = decodeToken.user
        // console.log(req.body.userId, decodeToken.user)
        // console.log(req.body.user)
        next();
    } catch (error) {
        return res.status(401).send({message:"Authentication  failed", Error:error.message, result:false})
    }
}




module.exports = {AuthenticationMiddleware}