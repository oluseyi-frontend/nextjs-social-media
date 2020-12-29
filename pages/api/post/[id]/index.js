import Post from "../../../../models/Post";
import verify from "../../../../utils/verifyToken";
import connectToDb from './../../../../utils/dbConnect';


connectToDb()

export default (req, res) => {
  if (req.method == 'GET') {
    Post.findById(req.query.id)
      .then((data) => {
       
        if (data) {
          res.status(200).json({
            success: true,
            data,
            msg: 'post successfully fetched'
          });
        } else {
          res.status(404).json({
            success: false,
            msg: "post doesnt exist",
          });
        }
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          err,
          msg: "post doesnt exist"
        });
      });

  } else if (req.method == 'DELETE') {
    const token = req.headers.auth;
    const user = verify(token);
console.log(req.query.id, req.headers.auth, token, user)
    Post.findById(req.query.id).then((data) => {
      console.log(data)
      if (data) {
        if (user.username === data.username) {
          Post.deleteOne({
              _id: data._id
            })
            .then((data) => {
              if (data) {
                res.status(200).json({
                  success: true,
                  message: "successfully deleted post",
                  data,
                });
              } else {
                res.status(200).json({
                  success: false,
                  message: "post not deleted",
                  data,
                });
              }

            })
            .catch((err) => {
              res.status(404).json({
                success: false,
                err,
                msg: "post not deleted",
              });
            });
        } else {
          res
            .status(200)
            .json({
              success: false,
              msg: "not your post to delete"
            });
        }
      } else {
        res.status(404).json({
          success: false,
          msg: "post doesnt exist"
        });
      }

    }).catch((err) => {
      res.status(200).json({
        success: false,
        err,
        msg: "post doesnt exist ooo"
      });
    })
  } else {}
};