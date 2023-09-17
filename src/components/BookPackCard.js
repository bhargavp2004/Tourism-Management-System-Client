import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const BookPackCard = (props) => {
  const handleButtonClick = async () => {
    // Handle the button click action here
    // You can use package_name or other package details to perform an action
    console.log(`Clicked on ${props.package_name}`);

    try{
        const res = await fetch("http://localhost:5000/bookSelectedPackage",
        {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
              package_name : props.package_name 
            })
        });
        const data = await res.json();
        console.log(data.message);
    }
    catch(err)
    {
        window.alert("Connection Error");
    }
  };

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
              </Row>
              <Button variant="primary" onClick={handleButtonClick}>
                Book Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookPackCard;
