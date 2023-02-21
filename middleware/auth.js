const jwt = require('jsonwebtoken')


const encodeToken = (data) =>{
    let token = jwt.sign({data},'SCMSystem', {expiresIn:'120M'});
    console.log(token)
    return token
}

const checkToken = (token)=>{
    const verifyToken = jwt.verify(token,'SCMSystem' )

    if(verifyToken){
        console.log(verifyToken)

        return true;
    }else{
        console.log(verifyToken)
        return false
    }
}

const decode = (token)=>{
    return jwt.decode(token);
}


const kiemTraToken = (req,res, next) =>{
    let {accessToken} = req.headers;
    console.log(accessToken)
    try {
        if(checkToken(accessToken)){
            next()
        }
    } catch (error) {
        res.status(401).send("token khong hop le")
    }
}


module.exports = {encodeToken, kiemTraToken, checkToken, decode}