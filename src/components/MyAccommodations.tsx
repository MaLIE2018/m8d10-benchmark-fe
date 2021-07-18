import React, { useContext, useEffect, useState } from "react";
import { Button, Col, Container, ListGroup, Row } from "react-bootstrap";
import { getRequest } from "../lib/axios";
import { Accommodation } from "../types";
import { LoginContext } from "./LoginContext";
const MyAccommodations = () => {
  const [accs, setAccs] = useState<Accommodation[] | []>([]);
  const { setOpen } = useContext(LoginContext);

  const getAccs = async () => {
    try {
      const res = await getRequest("users/me/accommodations");
      if (res.status === 200) {
        setAccs(res.data);
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAccs();
  }, []);
  return (
    <Container fluid='md'>
      <Row>
        <Col>
          <h1>My Accommodations</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={() => setOpen(true)}>Add</Button>
        </Col>
      </Row>
      <Row>
        <ListGroup>
          {accs.map((acc) => (
            <ListGroup.Item>
              {acc.name}
              {acc.description}
              {acc.location.location}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Row>
    </Container>
  );
};

export default MyAccommodations;
