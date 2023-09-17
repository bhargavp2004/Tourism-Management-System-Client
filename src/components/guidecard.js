import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const GuideCard = (props) => {
  console.log(props.idd);
  return (
    <Container>
      <Row>
        <Col>
          <Card className="my-3">
            <Card.Body>
              <Card.Title className="text-primary text-lg">
                {props.username}
              </Card.Title>
              <Row>
                <Col>
                  <Card.Text>
                    <strong className="text-lg">Email:</strong>{" "}
                    {props.email}
                  </Card.Text>
                </Col>
                <Col>
                  <Card.Text>
                    <strong className="text-lg">Mobile Number:</strong> 
                    {props.mobilenumber}
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

export default GuideCard;
