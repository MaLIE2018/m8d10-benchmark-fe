import React, { useContext, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { base64 } from "../lib/helper";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { getRequest } from "../lib/axios";
import { LoginContext } from "./LoginContext";

const Login: React.FC<RouteComponentProps> = ({ history }) => {
  const user = useRef<HTMLInputElement>(null);
  const pw = useRef<HTMLInputElement>(null);
  const { setLogged, setUser } = useContext(LoginContext);
  const [valid, setValid] = useState<boolean>(false);

  const auth = async () => {
    try {
      if (
        user !== null &&
        user.current !== null &&
        pw !== null &&
        pw.current !== null
      ) {
        const res = await getRequest("users/login", {
          headers: {
            Authorization: `Basic ${base64(
              [user.current.value, pw.current.value].join(":")
            )}`,
          },
        });

        if (res.status === 200) {
          setUser(res.data);
          setLogged(true);
          history.push("/accommodations");
        }
      }
    } catch (error) {
      if (error.response.status === 401) {
        setValid(true);
      }
    }
  };

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <Form.Group controlId='formBasicEmail'>
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type='email'
          placeholder='Enter email'
          ref={user}
          isInvalid={valid}
        />
        <Form.Text className='text-muted'>
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group controlId='formBasicPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          placeholder='Password'
          ref={pw}
          isInvalid={valid}
        />
      </Form.Group>

      <Button variant='primary' type='submit' onClick={() => auth()}>
        Submit
      </Button>
    </Form>
  );
};

export default withRouter(Login);
