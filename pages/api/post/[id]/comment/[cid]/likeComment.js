import Post from "../../../../../../models/Post";
import connectToDb from "../../../../../../utils/dbConnect";
import {
  handleCommentBodyValidation
} from "../../../../../../utils/validation";
import verify from "../../../../../../utils/verifyToken";

connectToDb();

export default (req, res) => {
  if (req.method == "POST") {
    const token = req.headers.auth;
    const user = verify(token);
console.log(token, user)
    if (user) {
      Post.findById(req.query.id)
        .then((data) => {
          if (data) {
            const commentIndex = data.comments.findIndex((comment) => comment._id == req.query.cid);
           
            if (data.comments[commentIndex]) {
              
              if (
                data.comments[commentIndex].likes.find(
                  (like) => like.username === user.username
                )
              ) {
                data.comments[commentIndex].likes = data.comments[
                  commentIndex
                ].likes.filter((like) => like.username !== user.username);
                data
                  .save()
                  .then((data) => {
                    if (data) {
                      res.status(200).json({
                         success: true,
                         data,
                         msg: `comment successfully unliked  by ${user.username}`,
                       });
                    } else {
                       res.status(200).json({
                         success: false,
                         data,
                         msg: `an error occured`,
                       });
                    }
                   
                  })
                  .catch((err) => {
                    res.status(404).json({
                      success: false,
                      err,
                      msg: `an error occured`,
                    });
                  });
              } else {
                data.comments[commentIndex].likes.push({
                  username: user.username,
                });
                data
                  .save()
                  .then((data) => {
                    if (data) {
                       res.status(200).json({
                         success: true,
                         data,
                         msg: `comment successfully liked by ${user.username}`,
                       });
                    } else {
                       res.status(200).json({
                         success: false,
                         data,
                         msg: `an error occured`,
                       });
                    }
                   
                  })
                  .catch((err) => {
                    res.status(404).json({
                      success: false,
                      err,
                      msg: `an error occured`,
                    });
                  });
              }
            }
            else {
              res.status(200).json({success: false, msg:'comment has been deleted or doesnt exist'})
            }
            
          } else {
            res.status(404).json({success: false, msg: "post doesnt exist"});
          }
        })
        .catch((err) => {
          res.status(404).json({
            success: false,
            msg: "post doesnt exst",
            err
          });
        });
    } else {
      res.status(200).json({success: false, 
        msg: "please login to like comment"
      });
    }
  }
};






// if (data.comments.likes.find((like) => like.username === user.username)) {
//   data.comments.likes = data.comments.likes.filter(
//     (like) => like.username !== user.username
//   );
//   data
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         data,
//         msg: `post successfully unliked  by ${user.username}`,
//       });
//     })
//     .catch(() => {});
// } else {
//   data.comments.likes.push({
//     username: user.username,
//   });
//   data
//     .save()
//     .then((data) => {
//       res.status(200).json({
//         data,
//         msg: `post successfully liked by ${user.username}`,
//       });
//     })
//     .catch(() => {});
// }