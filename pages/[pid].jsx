import { useRouter } from "next/router";
import Axios from "axios";
import {
  Container,
  Card,
  Image,
  Button,
  Icon,
  Header,
  Comment,
  Form,
  Label,
} from "semantic-ui-react";
import MyComment from "./../components/Comments";
import { useState, useContext } from "react";
import { DataCentral } from "../components/Context";
import moment from "moment";
import styles from "./../styles/Home.module.css";
import MySnackbar from "../components/Modal";

export const PostMain = ({ post }) => {
  const [comment, setComment] = useState("");
  const router = useRouter();
  const { token, username } = useContext(DataCentral);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "comment") {
      setComment(value);
    }
  };

  const handleSubmit = (e) => {
    
    e.preventDefault();
    Axios.post(
      `http://localhost:3000/api/post/${post.data._id}/comment`,
      {
        body: comment,
      },
      {
        headers: {
          auth: token,
        },
      }
    )
      .then((data) => {
        
        setMessage(data.data.msg);
        setOpen(true);
      })
      .catch((err) => {
       
      });
  };

  const handlePostDelete = () => {
    Axios.delete(`http://localhost:3000/api/post/${post.data._id}`, {
      data: { foo: "bar" },
      headers: { auth: token },
    })
      .then((data) => {
        console.log(data);
        if (data.data.message == "successfully deleted post") {
          setMessage(data.data.message);
          setOpen(true);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(post.data._id);
  };

  {
    if (router.isFallback)
      return (
        <Container>
          <h1>Loading...</h1>
        </Container>
      );
  }

  const addLikeToPost = () => {
    Axios.post(
      `http://localhost:3000/api/post/${post.data._id}/like`,
      {},
      {
        headers: {
          auth: token,
        },
      }
    )
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <Container>
      <Card className={styles.my_card}>
        <Card.Content>
          <Image
            floated="right"
            size="mini"
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          />
          <Card.Header>{post.data.username}</Card.Header>
          <Card.Meta>{moment(post.data.createdAt).fromNow()}</Card.Meta>
          <Card.Description>{post.data.body}</Card.Description>
        </Card.Content>
        <Card.Content extra className={styles.pid_card_content}>
          <div className="ui two buttons">
            <Button as="div" labelPosition="right" onClick={addLikeToPost}>
              <Button color="red" className={styles.my_labelled_button}>
                <Icon name="heart" />
                Like
              </Button>
                          <Label as="a" basic color="red" pointing="left" className={styles.my_labelled_label}>
                {post.data.likes.length}
              </Label>
            </Button>
            <Button as="div" labelPosition="right">
              <Button basic color="blue" className={styles.my_labelled_button}>
                <Icon name="comment" />
                Comment
              </Button>
                          <Label as="a" basic color="blue" pointing="left" className={styles.my_labelled_label}>
                {post.data.comments.length}
              </Label>
            </Button>
            {post.data.username == username ? (
              <Button as="div" labelPosition="right">
                <Button basic color="red" onClick={handlePostDelete} className={styles.my_labelled_button}>
                  <Icon name="delete" />
                  Delete
                </Button>
              </Button>
            ) : null}
          </div>
        </Card.Content>
      </Card>
      <Comment.Group className={styles.my_comment_group}>
        <Header as="h3" dividing>
          Comments
        </Header>
        {post.data.comments.map((comment) => {
          return (
            <MyComment
              key={comment._id}
              postId={post.data._id}
              comment={comment}
              postUsername={post.data.username}
            />
          );
        })}

        <Form reply>
          <Form.TextArea
            onChange={handleChange}
            name="comment"
            value={comment}
          />
          <Button
            content="Add Reply"
            onClick={handleSubmit}
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Comment.Group>
      <MySnackbar open={open} setOpen={setOpen} message={message} />
    </Container>
  );
};

export default PostMain;

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const res = await Axios.get("http://localhost:3000/api/post");

  const posts = await res.data.data;

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    params: { pid: post._id },
  }));
  
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: true };
}

export async function getStaticProps(context) {
  console.log(context.params);
  const res = await Axios.get(
    `http://localhost:3000/api/post/${context.params.pid}`
  );
  const post = await res.data;

  return {
    props: {
      post,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
