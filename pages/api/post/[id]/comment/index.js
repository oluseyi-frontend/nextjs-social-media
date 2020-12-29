
import Post from './../../../../../models/Post'
import connectToDb from './../../../../../utils/dbConnect';
import {handleCommentBodyValidation} from './../../../../../utils/validation'
import verify from './../../../../../utils/verifyToken'


connectToDb()

export default (req, res) => {
  if (req.method == 'POST') {
    const error = handleCommentBodyValidation(req.body)
    if (error.error) {
      res.status(200).json({ msg: error.error.details[0].message });
    }
    else {
       const token = req.headers.auth;
      const user = verify(token);
      if (user) {
        Post.findById(req.query.id).then((data) => {
          
          if (data) {
             data.comments.unshift({
               body: req.body.body,
               username: user.username,
             });
             data
               .save()
               .then((data) => {
                 if (data) {
                   res.status(200).json({success: true, data, msg: 'comment succesfully saved' });
                 } else {
                   res
                     .status(200)
                     .json({
                       success: false,
                       data,
                       msg: "an error occured, couldnt save comment",
                     });
                 }
                 
               })
               .catch((err) => {
                 res
                   .status(404)
                   .json({
                     success: false,
                     err,
                     msg: "comment succesfully saved",
                   });
               });
          } else {
            res.status(200).status({status: false, msg: 'could not fetch post'})
          } 
        }).catch((err) => {
          res.status(200).json({ success: false, err, msg: "post doesnt exist" });
         })
      } else {
        res.status(200).json({success: false, msg: 'please login to post comment'})
      }
    }
  }
   
    else if(req.method == 'GET'){
    res.send(req.query)
    }
  
};
