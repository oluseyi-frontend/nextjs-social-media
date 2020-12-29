import Post from './../../../../../models/Post'
import connectToDb from './../../../../../utils/dbConnect';
import {handleCommentBodyValidation} from './../../../../../utils/validation'
import verify from './../../../../../utils/verifyToken'



connectToDb()


export default (req, res) => {
    if (req.method == 'POST') {
        const token = req.headers.auth;
        const user = verify(token);
        
        if (user) {
            console.log(user)
            Post.findById(req.query.id).then((data) => {
                if (data) {
                    if (data.likes.find((like) => like.username === user.username)) {
                        data.likes = data.likes.filter((like) => like.username !== user.username)
                         data.save().then((data) => {
                        res.status(200).json({success: true, data, msg: `post successfully unliked  by ${user.username}`});
                    }).catch((err) => {
                         res.status(404).json({
                      success: false,
                     err,
                      msg: `an error occured`,
                    });
                    })
                    } else {
                        data.likes.push({
                           username: user.username 
                        })
                         data.save().then((data) => {
                        res.status(200).json({data, msg: `post successfully liked by ${user.username}`});
                    }).catch((err) => {
                         res.status(404).json({
                      success: false,
                     err,
                      msg: `an error occured`,
                    });
                    })
                    }
                   
                } else {
                    res.status(200).status({success: false,  msg: 'post doesnt exist'})
                }
            }).catch((err) => {
                res.status(404).json({success: false, msg: 'post doesnt exist', err})
            })
        } 
            else {
        res.status(200).json({success: false, msg: 'please login to like post'})
      }
        
  }
}
