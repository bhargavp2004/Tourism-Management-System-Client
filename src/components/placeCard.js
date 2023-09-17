import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const PlaceCard = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="my-3">
            <Card.Body>
              <Card.Title className="text-primary text-lg">
                {props.place_name}
              </Card.Title>
              <Row>
                <Col>
                  <Card.Text>
                    <strong className="text-lg">Description:</strong>{" "}
                    {props.place_desc}
                  </Card.Text>
                </Col>
                <Col className="text-right">
                  <div className="button-container">
                    <a href={`${props.add}/${props.idd}`} className="btn btn-primary custom-btn">
                      Update
                    </a>
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PlaceCard;
