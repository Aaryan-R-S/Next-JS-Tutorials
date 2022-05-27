import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
const CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');

const handler = async(req,res) => {
    if(req.method == 'POST'){
        let user = await User.findOne({"email": req.body.email})
        if(user){
            const bytes = CryptoJS.AES.decrypt(user.password, 'mySecretKey');
            let decryptedPass = bytes.toString(CryptoJS.enc.Utf8)
            if (req.body.email == user.email && decryptedPass == req.body.password){
                var token = jwt.sign({email:user.email, name:user.name}, 'jwtsecret', {
                    expiresIn: "2d"
                });
                res.status(200).json({success: true, token})
            }
            else{
                res.status(404).json({success: false, error: "Invalid Credentials"})
            }
        } 
        else{
            res.status(404).json({success: false, error: "No user found!"})
        }
    }
    else{
        res.status(400).json({error: "This method is not allowed!"})
    }
}

export default connectDb(handler);
