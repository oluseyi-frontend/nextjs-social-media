import Head from "next/head";
import styles from "../styles/Home.module.css";
import {
  Card,
  
  Image,
  Icon,
  Button,
  Form,
  Container,
  Label,
} from "semantic-ui-react";
import Axios from "axios";
import { useEffect, useContext, useState } from "react";
import Posts from "./../components/Post";
import Link from "next/link";
import { DataCentral } from "./../components/Context";
import MySnackbar from "../components/Modal";
import { Grid } from "@material-ui/core";

export default function Home({ posts }) {
  const [incomingPosts, setIncomingPosts] = useState([]);
  const [post, setPost] = useState("");
  const { token } = useContext(DataCentral);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setIncomingPosts(posts.data);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "post") {
      setPost(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(
      "http://localhost:3000/api/post",
      {
        body: post,
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

  return (
    <div className={styles.container}>
      <Head>
        <title> Create Next App </title> <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <Container>
        <Grid container spacing={1}>
            {token ? (
              <Grid item xs={12}>
                <Form>
                  <Form.Field>
                    <label> Whats on your mind: </label>{" "}
                    <input onChange={handleChange} name="post" value={post} />{" "}
                  </Form.Field>{" "}
                  <Form.Field> </Form.Field>{" "}
                  <Button type="submit" onClick={handleSubmit}>
                    Submit{" "}
                  </Button>{" "}
                </Form>{" "}
              </Grid>
            ) : null}
            {incomingPosts.map((post) => {
              return <Posts post={post} key={post._id} />;
            })}
        </Grid>{" "}
        <MySnackbar open={open} setOpen={setOpen} message={message} />{" "}
      </Container>{" "}
    </div>
  );
}

export async function getStaticProps(context) {
  const res = await Axios.get("http://localhost:3000/api/post");
  const posts = await res.data;

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every second
    revalidate: 1, // In seconds
  };
}
