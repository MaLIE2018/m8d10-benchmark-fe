import { Button, Col, Row } from "react-bootstrap";
import { Accommodation } from "../types";
import AccList from "./AccList/AccList";
import withSubscription from "./hoc/withSubscription";

const MyAccommodations = ({
  accs,
  setOpen,
}: {
  accs: Accommodation[];
  setOpen: Function;
}) => {
  return (
    <>
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
        <Col>
          <AccList accommodations={accs} />
        </Col>
      </Row>
    </>
  );
};

export default withSubscription(MyAccommodations, "users/me/accommodations");
