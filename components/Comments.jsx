import React, { Component } from 'react';
import { useContext, useState } from 'react'
import { Button, Comment, Form, Feed, Header, Icon, Label } from 'semantic-ui-react'
import { DataCentral } from './Context'
import Axios  from 'axios';
import styles from './../styles/Home.module.css'
import MySnackbar from './Modal';

const MyComment = ({ comment, postId, postUsername }) => {
    const { token, username } = useContext(DataCentral)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('')
    
    

    const addLikeToComment = () => {
       
        Axios.post(`http://localhost:3000/api/post/${postId}/comment/${comment._id}/likeComment`,
           {},
             {
        headers: {
          auth:
            token,
        },
      }
        ).then((data) => {
            console.log(data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const handleCommentDelete = () => {
        
        Axios.delete(`http://localhost:3000/api/post/${postId}/comment/${comment._id}`, {
            data:
                { foo: "bar" },
            headers:
                { "auth": token }
        }).then((data) => {
            console.log(data)
             setMessage(data.data.msg)
                setOpen(true)
        }).catch((err)=>{
            console.log(err)
        })
      
  }
    
    return ( 
       <>
            <Comment className={styles.my_comment}>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
            <Comment.Content>
                <Comment.Author as='a'>{comment.username}</Comment.Author>
                <Comment.Metadata>
                
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                <Comment.Actions>
                        <Comment.Action onClick={addLikeToComment}>
                            <Feed.Meta>
                                <Feed.Like>
                                    <Icon name='like' /> {comment.likes.length}
                                </Feed.Like>
                                </Feed.Meta>
                    </Comment.Action>
                     {
                          postUsername==username? <Comment.Action onClick={handleCommentDelete}>
                            <Feed.Meta>
                                <Feed.Like>
                                    <Icon name='delete' /> Delete
                                </Feed.Like>
                                </Feed.Meta>
                            </Comment.Action>: null
                      }  
                </Comment.Actions>
            </Comment.Content>
        </Comment>
        <MySnackbar open={open} setOpen={setOpen} message={message}/>
       </>
    );
}
 
export default MyComment;