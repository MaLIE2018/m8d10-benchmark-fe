import { Col, Row } from "react-bootstrap";
import { Accommodation } from "../types";
import AccList from "./AccList/AccList";
import withSubscription from "./hoc/withSubscription";

const Inside = ({ accs }: { accs: Accommodation[] }) => {
  return (
    <>
      <Row>
        <Col>
          <h1>Accommodations</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <AccList accommodations={accs} />
        </Col>
      </Row>
    </>
  );
};

export default withSubscription(Inside, "accommodation");
