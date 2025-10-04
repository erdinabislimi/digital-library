import React, { useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [input, setInput] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.username.length < 3 || input.username.length > 30) {
      alert("Username must be between 3 and 30 characters.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    try {
      const res = await axios.post(
        "https://localhost:7226/api/Authenticate/register/",
        input
      );

      // Handle success
      console.log("Registration successful!");
       navigate("/login"); 

    } catch (err) {
      console.error("Registration error:", err);
    }
  };

  return (
    <Container
      fluid
      className="d-flex align-items-center justify-content-center vh-100"
      style={{ backgroundColor: "#FFC0CB" }} // Baby pink background
    >
      <Row className="w-100 justify-content-center">
        <Col xs={10} sm={8} md={5} lg={4}>
          <Card className="shadow border-0" style={{ borderRadius: "15px" }}>
            <Card.Body className="p-4">
              <Card.Title className="text-center mb-3">
                <h3 style={{ color: "#8b004c" }}>Join Us Today</h3>
                <p style={{ color: "#333" }}>Enter your details to register.</p>
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label className="fw-semibold">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    required
                    name="username"
                    minLength={3}
  maxLength={30}
                    onChange={handleChange}
                    className="rounded-pill shadow-sm"
                    style={{ padding: "0.75rem 1.25rem" }}
                  />
                </Form.Group>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label className="fw-semibold">Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    required
                    name="email"
                    onChange={handleChange}
                    className="rounded-pill shadow-sm"
                    style={{ padding: "0.75rem 1.25rem" }}
                  />
                </Form.Group>
                <Form.Group controlId="password" className="mb-3">
                  <Form.Label className="fw-semibold">Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    required
                    name="password"
                    onChange={handleChange}
                    className="rounded-pill shadow-sm"
                    style={{ padding: "0.75rem 1.25rem" }}
                  />
                </Form.Group>
                <div className="d-grid mt-4">
                  <Button
                    type="submit"
                    style={{
                      backgroundColor: "#8b004c",
                      border: "none",
                      fontWeight: "bold",
                      borderRadius: "50px",
                      padding: "0.75rem",
                    }}
                  >
                    Join Us
                  </Button>
                </div>
              </Form>
              <div className="mt-3 text-center">
                <span style={{ color: "#333" }}>Already have an account? </span>
                <a href="/" style={{ color: "#8b004c", fontWeight: "bold" }}>
                  Login
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
