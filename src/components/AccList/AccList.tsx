import React from "react";
import { Accommodation } from "../../types";
import { ListGroup } from "react-bootstrap";
import { Styles } from "./styles";
interface Props {
  accommodations: Accommodation[];
}

const AccList: React.FC<Props> = ({ accommodations }) => {
  return (
    <Styles>
      <ListGroup>
        {accommodations.map((acc) => (
          <ListGroup.Item key={acc._id}>
            <span>{acc.name}</span>
            <span>{acc.description}</span>
            <span>{acc.location.location}</span>
            <span>Guests maximal: {acc.maxGuests}</span>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Styles>
  );
};

export default AccList;
