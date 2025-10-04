import { useState } from "react";
import { Button, Col, Container, Form, Row, Card } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://localhost:7226/api/Authenticate/login/", {
        username,
        password,
      });
      const token = res?.data?.token;
      localStorage.setItem("token", token);
      await fetchUserRole(username);
      navigate("/home");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserRole = async (username: string) => {
    try {
      const response = await axios.get(`https://localhost:7226/api/Authenticate/role/${username}`);
      const { role } = response.data;
      localStorage.setItem("role", role);
      const idResponse = await axios.get(`https://localhost:7226/api/Authenticate/id/${username}`);
      const { id } = idResponse.data;
      localStorage.setItem("userId", id);
      localStorage.setItem("username", username);
    } catch (error) {
      console.log(error);
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
                <h3 style={{ color: "#8b004c" }}>Welcome Back</h3>
                <p style={{ color: "#333" }}>Enter your details to sign in.</p>
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="username" className="mb-3">
                  <Form.Label className="fw-semibold">Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
                    Sign In
                  </Button>
                </div>
              </Form>
              <div className="mt-3 text-center">
                <span style={{ color: "#333" }}>Don't have an account? </span>
                <a href="/register" style={{ color: "#8b004c", fontWeight: "bold" }}>
                  Sign up
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
