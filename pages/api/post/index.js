
import connectToDb from './../../../utils/dbConnect';
import Post from './../../../models/Post'
import verify from '../../../utils/verifyToken';


connectToDb()

export default (req, res) => {
  

    if (req.method == 'POST') {
       const token = req.headers.auth;
      const user = verify(token)
    
      if (user) {
         const post = new Post({
           body: req.body.body,
          user: user.id,
           username:  user.username 
         });
        
        post.save().then((data) => {
          if (data) {
            res.status(200).json({ success: true, msg: 'post saved successfully', data });
          } else {
            res.status(404).send({success: false, msg: "post not saved" });
          }
        }).catch((err) => {
           res.status(404).json({ success: false, err, msg: 'post not saved' });
        })
      }
      else {
        res.status(200).send({ msg: "log in to perform this operaton" });
      }
    }
  
  
  
    else if (req.method == 'GET') {
        Post.find().sort({createdAt: -1})
          .then((data) => {
            if (data) {
              res.status(200).json({ success: true, msg: 'post successfully fetched', data });
            } else {
              res.status(404).json({success: false,  msg: "post doesnt exist" });
            }
          })
          .catch((err) => {
            res
              .status(404)
              .json({ success: false, err, msg: "post doesnt exist" });
          });
       }
};