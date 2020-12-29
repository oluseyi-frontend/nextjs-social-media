import { Card, Button, Icon, Label, Image } from "semantic-ui-react";
import { Grid } from "@material-ui/core";
import Link from "next/link";
import moment from "moment";
import Axios from "axios";
import { useContext } from "react";
import { DataCentral } from "./Context";
import styles from "./../styles/Home.module.css";

const Posts = ({ post }) => {
  const { token } = useContext(DataCentral);

  const addLikeToPost = () => {
    Axios.post(
      `http://localhost:3000/api/post/${post._id}/like`,
      {},
      {
        headers: {
          auth: token,
        },
      }
    )
      .then((data) => {
       
      })
      .catch((err) => {
       
      });
  };

  if (post) {
    return (
      <Grid item xs={12} className={styles.my_column}>
        <Card className={styles.my_card}>
          <Link href={`/${post._id}`}>
            <Card.Content>
              <Image
                floated="right"
                size="mini"
                src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
              />
              <Card.Header>{post.username}</Card.Header>
              <Card.Meta>{moment(post.createdAt).fromNow()} </Card.Meta>

              <Card.Description>{post.body}</Card.Description>
            </Card.Content>
          </Link>
          <Card.Content extra className={styles.card_content}>
            <div className="ui two buttons">
              <Button
                as="div"
                labelPosition="right"
                className={styles.post_buttons}
                onClick={addLikeToPost}
              >
                <Button color="red" >
                  <Icon name="heart" />
                  Like
                </Button>
                <Label as="a" basic color="red" pointing="left">
                  {post.likes.length}
                </Label>
              </Button>
              <Link href={`/${post._id}`}>
                <Button
                  as="div"
                  labelPosition="right"
                  className={styles.post_buttons}
                >
                  <Button basic color="blue" >
                    <Icon name="comment" />
                    Comment
                  </Button>
                  <Label as="a" basic color="blue" pointing="left">
                    {post.comments.length}
                  </Label>
                </Button>
              </Link>
            </div>
          </Card.Content>
        </Card>
      </Grid>
    );
  } else {
    return <h1>Loading....</h1>;
  }
};

export default Posts;
