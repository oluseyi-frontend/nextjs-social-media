import Post from '../../../../../../models/Post'
import connectToDb from '../../../../../../utils/dbConnect';
import verify from '../../../../../../utils/verifyToken'




connectToDb()


export default (req, res) => {
  if (req.method == 'DELETE') {
   
  const token = req.headers.auth;
    const user = verify(token);
    console.log('you are at the delete comment', token, user)
    if (user) {

    Post.findById(req.query.id)
      .then((data) => {
        const commentIndex = data.comments.findIndex((comment) => comment.id == req.query.cid)
        if (data.comments[commentIndex].username == user.username) {
          data.comments.splice(commentIndex, 1)
          data.save().then((data) => {
            if (data) {
              res
                .status(200)
                .json({
                  success: true,
                  data,
                  msg: "comment deleted successfully",
                });
            } else {
              res
                .status(200)
                .json({
                  success: false,
                  data,
                  msg: "an error occured",
                });
            }
            
          }).catch((err) => {
            res.status(404).json({success:false, err, msg:'could not save post'})
          })
        } else { 
          res.status(200).json({success: false,  msg:'not your comment to delete'})
        }
      })
      .catch((err) => {
        res.status(404).json({success: false,  err, msg: 'post not found'})
         });
      
      
    } else {
      res.status(200).status({success: false,  msg: 'login to delete comment'})
}

  
 }
};
