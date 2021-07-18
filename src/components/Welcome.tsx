import React, { useContext } from "react";
import { Col, Row } from "react-bootstrap";
import { RouteComponentProps } from "react-router-dom";

import Login from "./Login";
import { LoginContext } from "./LoginContext";
import SignUp from "./SignUp/SignUp";

const Welcome: React.FC<RouteComponentProps> = () => {
  const { newCustomer } = useContext(LoginContext);
  return (
    <>
      <Row>
        <Col>
          <h1>Welcome</h1>
          {!newCustomer ? <Login /> : <SignUp />}
        </Col>
      </Row>
    </>
  );
};

export default Welcome;
