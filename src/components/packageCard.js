import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const PackageCard = (props) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card className="my-3">
            <Card.Body>
              <Card.Title className="text-primary text-lg">
                {props.package_name}
              </Card.Title>
              <Row>
                <Col>
                  <Card.Text>
                    <strong className="text-lg">Days:</strong>{" "}
                    {props.package_days}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <strong className="text-lg">Price:</strong> Rs.
                    {props.package_price}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <strong className="text-lg">Guide:</strong>{" "}
                    {props.package_guide}
                  </Card.Text>
                </Col>
                <Col className="text-right">
                  <div className="button-container">
                    <a href={`${props.add}/${props.idd}`} className="btn btn-primary custom-btn">
                      {props.task}
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

export default PackageCard;
