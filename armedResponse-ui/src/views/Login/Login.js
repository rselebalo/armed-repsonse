import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import auth0Client from "../../components/Auth/Auth";
import { FormGroup } from "react-bootstrap";

class Login extends Component {
  constructor() {
    super();
    this.login = this.login.bind(this);
    this.state = {
      userName: "",
      password: ""
    };
  }
  componentWillMount() {
    const { history } = this.props;
    if (sessionStorage.getItem("accessToken")) {
      history.push("/dashboard");
    }
  }
  login() {
    auth0Client.signIn(this.state.userName, this.state.password);
  }
  render() {
    return (
      <div
        className="app flex-row align-items-center"
        style={{
          backgroundColor: "white",
          backgroundPosition: "left",
          backgroundRepeat: "repeat-y",
          backgroundSize: "55% 100%"
        }}
      >
        
        <Container>
          <Row
            className="justify-content-center"
          >
            <Col md="6">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <FormGroup>
                        <Row>
                          <Col xs={6} sm={6} md={6}>
                            <h1>Login</h1>
                            <p className="text-muted">
                              Sign In to your account
                            </p>
                          </Col>                          
                        </Row>
                      </FormGroup>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="text"
                          placeholder="Username"
                          autoComplete="username"
                          value={this.state.userName}
                          onChange={evt => {
                            this.setState({
                              ...this.state,
                              userName: evt.target.value
                            });
                          }}
                        />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          type="password"
                          placeholder="Password"
                          autoComplete="current-password"
                          value={this.state.password}
                          onChange={evt => {
                            this.setState({
                              ...this.state,
                              password: evt.target.value
                            });
                          }}
                        />
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button
                            color="primary"
                            className="px-4"
                            onClick={() => {
                              this.login();
                            }}
                          >
                            Login
                          </Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">
                            Forgot password?
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>                
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
