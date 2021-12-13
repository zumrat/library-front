import React from "react";
import { Table, Row, Col, Container, Card, ListGroupItem, ListGroup, Button } from 'react-bootstrap';

function About() {
  return (
    <Container>
      <br />
      <div class="d-flex justify-content-center">
      <h1>About us</h1>
      </div>
  <Row>
    <Col>
    <br />
    
    <div class="d-flex justify-content-center">
    <Card className="text-center">
  
  <Card.Body>
    <Card.Text>
    <Container>
      <Row>
      <Col>
      <Card.Img variant="top" src="https://i.ibb.co/191QwDS/c89d8d893d12c674506edb04d5c9afed.png"  class="rounded"></Card.Img>
      </Col>
      <Col>
      <Card className="text-center">
  <Card.Header>Working hours</Card.Header>
  <Card.Body>
    
    <Card.Text>
    <Table responsive="sm">
      <tbody>
        <tr>
          <td>Monday</td>
          <td></td>
          <td>08:00 - 23:00</td>
        </tr>
        <tr>
          <td>Tuesday</td>
          <td></td>
          <td>08:00 - 23:00</td>
        </tr>
        <tr>
          <td>Wednesday</td>
          <td></td>
          <td>08:00 - 23:00</td>
        </tr>
        <tr>
          <td>Thursday</td>
          <td></td>
          <td>08:00 - 23:00</td>
        </tr>
        <tr>
          <td>Friday</td>
          <td></td>
          <td>08:00 - 21:00</td>
        </tr>
        <tr>
          <td>Saturday</td>
          <td></td>
          <td>10:00 - 19:00</td>
        </tr>
        <tr>
          <td>Sunday</td>
          <td></td>
          <td>10:00 - 19:00</td>
        </tr>
      </tbody>
    </Table>
    </Card.Text>
  </Card.Body>
</Card>
      </Col>
      </Row>
    </Container>
    </Card.Text>
  </Card.Body>
  <ListGroup className="list-group-flush">
    <ListGroupItem><b>Address:</b> Rīga, Uzvaras bulvāris 16, LV-1048</ListGroupItem>
    <ListGroupItem><b>Telephone number:</b> +37164791337</ListGroupItem>
  
  
  <ListGroupItem>
    <Card.Link href="https://www.instagram.com/"><b>Instagram</b></Card.Link>
    <Card.Link href="https://www.youtube.com/"><b>Youtube</b></Card.Link>
    <Card.Link href="https://www.facebook.com/"><b>Facebook</b></Card.Link>
    </ListGroupItem>
  
  </ListGroup>
</Card>
</div>
    </Col>
 
  </Row>
  <br />
</Container>
  );
}

export default About;
