import { handleLoginValidation } from "../../../utils/validation";


import User from "./../../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import connectToDb from './../../../utils/dbConnect';

connectToDb()

export default (req, res) => {
  if (req.method == "POST") {
    const error = handleLoginValidation(req.body);

    if (error.error) {
      res.status(404).json({success: false, msg: error.error.details[0].message });
    } else {
       User.findOne({username: req.body.username})
         .then((data) => {
           if (data) {
            //  if (data.confirmed == true) {
               bcrypt.compare(
                 req.body.password,
                 data.password,
                 (err, result) => {
                   // result == true
                   if (result) {
                     const token = jwt.sign(
                       {
                         id: data._id,
                         email: data.email,
                         username: data.username,
                       },
                       process.env.SECRET_KEY
                     );
                     //res.header('auth-token', token);
                     res.status(200).json({username: data.username, id: data._id, token: token});
                   } else {
                     res.status(200).json({success: false,  msg: "wrong password" });
                   }
                 }
               );
            //  } else {
            //    res.json({ msg: "verify email first" });
            //  }
           } else {
             res.status(200).json({success:false, msg: "no user with such username" });
           }
         })
         .catch((err) => {
           res.status(200).json({success: false, err,  msg: "error" });
         });
        
    }
  }
};
