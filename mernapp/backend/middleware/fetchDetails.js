var jwt = require('jsonwebtoken');
// const jwtSecret = "HaHa"

const jwtSecret = "47ac000103ddb2ff40b9ad50775c8cc319e4142c961a8be64098cd340302f1dce384c053bb6328034cad9e35ab0980ed4731d3a9741f591df588a302103c8b10";
const fetch = (req,res,next)=>{

    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Invalid Auth Token"})

    }
    try {
        const data = jwt.verify(token,jwtSecret);
        req.user = data.user
        next();
        
    } catch (error) {
        res.status(401).send({error:"Invalid Auth Token"})
    }

}
module.exports = fetch