import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

import Login from "./Login";
import { LoginContext } from "./LoginContext";
import SignUp from "./SignUp/SignUp";

const Welcome: React.FC<RouteComponentProps> = () => {
  const { newCustomer } = useContext(LoginContext);
  return (
    <Container fluid='md'>
      <Row>
        <Col>
          <h1>Welcome</h1>
          {!newCustomer ? <Login /> : <SignUp />}
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
