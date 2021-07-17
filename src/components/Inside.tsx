import React, { useEffect, useState } from "react";
import { Col, Container, ListGroup, Row } from "react-bootstrap";
import { getRequest } from "../lib/axios";
import { Accommodation } from "../types";
const Inside = () => {
  const [accs, setAccs] = useState<Accommodation[] | []>([]);

  const getAccs = async () => {
    try {
      const res = await getRequest("accommodation");
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
          <h1>Accommodations</h1>
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

export default Inside;
