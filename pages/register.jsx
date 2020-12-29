import { Container } from "@material-ui/core";
import { useContext, useState } from "react";
import { Form, Button } from "semantic-ui-react";
import Axios from "axios";
import { DataCentral } from "../components/Context";
import { useRouter } from "next/router";

const Register = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { token } = useContext(DataCentral);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "username") {
      setUsername(value);
    }
    if (name == "password") {
      setPassword(value);
    }
    if (name == "email") setEmail(value);
  };

  const handleClick = (e) => {
    e.preventDefault();

    Axios.post("http://localhost:3000/api/user/register", {
      username: username,
      email: email,
      password: password,
    })
      .then((info) => {
        console.log(info);
        const { data } = info;
        if (data.msg == "successfully registered user") {
          router.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Container maxWidth="sm">
      <Form>
        <Form.Field>
          <label>Username</label>
          <input
            onChange={handleChange}
            name="username"
            value={username}
            placeholder="Username"
          />
        </Form.Field>
        <Form.Field>
          <label>Email</label>
          <input
            onChange={handleChange}
            name="email"
            value={email}
            placeholder="Email"
          />
        </Form.Field>
        <Form.Field>
          <label>Passoword</label>
          <input
            onChange={handleChange}
            name="password"
            value={password}
            placeholder="Password"
          />
        </Form.Field>
        <Form.Field></Form.Field>
        <Button type="submit" onClick={handleClick}>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
