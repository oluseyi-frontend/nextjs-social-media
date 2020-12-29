import { handleRegistrationValidation } from "../../../utils/validation";

//import bcrypt
//import jsonwebtoken
import User from './../../../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import connectToDb from './../../../utils/dbConnect';


connectToDb();

export default (req, res) => {
  if (req.method == 'POST') {
   
    
      const error =   handleRegistrationValidation(req.body)
       
       
         if (error.error) {
           res.status(200).json({ msg: error.error.details[0].message });
         } else {
           User.findOne({ username: req.body.username }).then(
             (data) => {
               if (data) {
                 res.status(200).json({success: false, msg: "username already exists" });
               } else {
                 bcrypt.genSalt(10, (err, salt) => {
                   bcrypt.hash(req.body.password, salt, (err, hash) => {
                     if (err) {
                       res
                         .status(404)
                         .json({
                           success: false,
                           msg: "bcrypt couldnt hash password",
                         });
                     } else {
                       const user = new User({
                         username: req.body.username,
                         email: req.body.email,
                         password: hash,
                       });
                       user
                         .save()
                         .then((data) => {
                           if (data) {
                                const token = jwt.sign(
                                  { _id: data._id },
                                  "process.env.TOKEN_SECRET"
                                );
                                res.status(200).json({ data, token, msg: 'successfully registered user' });
                           } else {
                             res
                               .status(404)
                               .json({
                                 success: false,
                                 
                                 msg: "couldnt register user",
                               });
                             }
                            
                         })
                         .catch((err) => {
                         
                           res.status(404).json({success:false, err, msg: 'couldnt register user' });
                         });
                     }
                   });
                 });
               }
             }
           );
         } 
}
};
