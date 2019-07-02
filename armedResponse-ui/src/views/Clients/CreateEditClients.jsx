import React from "react";
import {
  Button,
  CardFooter,
  Col,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label
} from "reactstrap";
// import { Typeahead } from "react-bootstrap-typeahead";
import Alert from "../../components/Alert";
import ClientLogic from "../../logic/Clients";
let Clients = [];

class CreateClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      cellPhone: "",
      
      clientList: null,
      selectedClient: "",
      createEdit: "Create",
      alertMessage: "",
      alertType: "",
      showAlert: false,
      showLoadingIndicator: false
    };
    this.handleChange = this.handleChange.bind(this);
    // this.getMemberList = this.getMemberList.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);

    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    // Fetch the clients to populate the select
    ClientLogic.getAllClients()
      .then(clients => {
        Clients = clients;
        const clientList = clients.map(client => (
          // eslint-disable-next-line react/no-array-index-key
          <option value={client.clientId} key={client.clientId}>
            {client.name}
          </option>
        ));

        this.setState({
          ...this.state,
          clientList
        });
      })
      .catch(error =>
        this.setState({
          ...this.state,
          showAlert: true,
          alertMessage: `Failed to load clients. Error: ${error}`,
          alertType: "danger"
        })
      );
  }

  resetForm = () => {
    this.setState(this.baseState);
  };
  toggleAlert(show) {
    this.setState({
      ...this.state,
      showAlert: show
    });
  }
  handleChange(event) {
    const { target } = event.target;
    // const value = target.value;
    // const name = target.name;

    this.setState({
      [target.name]: target.value
    });
  }
  // getMemberList() {
  //   ClientLogic.getMembers()
  //     .then(sup => {
  //       const suppliers = [];
  //       sup.message.members.map(s => {
  //         suppliers.push({ label: s.memberName, id: s.memberNo });
  //       });
  //       this.setState({
  //         ...this.state,
  //         memberTypeAheadList: suppliers
  //       });
  //     })
  //     .catch(err => {
  //       this.setState({
  //         ...this.state,
  //         showAlert: true,
  //         alertType: "danger",
  //         alertMessage: err.message
  //       });
  //     });
  // }
  submitRequest(clientId, firstname, lastname, email, cellPhone) {
    this.setState({ showLoadingIndicator: true });
    if (clientId !== "") {
      // update client details      
      ClientLogic.updateClientDetails(
        clientId,
        firstname,
        lastname,
        email,
        cellPhone
      )
        .then(usr => {
          this.setState({
            ...this.state,
            showAlert: true,
            alertMessage: `Client: ${usr.firstname} ${usr.lastname}  successfully updated`,
            alertType: "success",
            showLoadingIndicator: false
          });
          // history.push('/');
        })
        .catch(error =>
          this.setState({
            ...this.state,
            showAlert: true,
            alertMessage: `Failed to update the client details. Error: ${
              error.message
            }`,
            alertType: "danger",
            showLoadingIndicator: false
          })
        );
    } else {
      // create new client
      ClientLogic.createClient(firstname, lastname, email, cellPhone)
        .then(usr => {
          this.setState({
            ...this.state,
            showAlert: true,
            alertMessage: `Client: ${usr.firstname} ${usr.lastname}  successfully created`,
            alertType: "success",
            showLoadingIndicator: false
          });
          // history.push('/');
        })
        .catch(error =>
          this.setState({
            ...this.state,
            showAlert: true,
            alertMessage: error.message,
            alertType: "danger",
            showLoadingIndicator: false
          })
        );
    }

    this.resetForm();
  }

  loadClientDetails(clientId) {
    const client = Clients.filter(usr => usr.clientId === clientId);
    this.setState({
      ...this.state,
      selectClient: client[0].clientId,
      firstName:
        client[0].name !== undefined
          ? client[0].name.substr(0, client[0].name.indexOf(" "))
          : "",
      lastName:
        client[0].name !== undefined
          ? client[0].name.substr(
              client[0].name.indexOf(" ") + 1,
              client[0].name.length
            )
          : "",
      email: client[0].email,
      cellPhone: client[0].cellPhone
    });
  }
  
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="fa fa-align-justify" /> Create or Edit Client
          </div>
          <div className="card-body">
            <Col
              xs="12"
              sm="12"
              md="12"
              style={{ textAlign: "center", bottom: "10px" }}
            >
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-radio1"
                  name="inline-radios"
                  checked={this.state.createEdit === "Create"}
                  onChange={() => this.setState({ createEdit: "Create" })}
                  value="Create"
                />
                <Label
                  className="form-check-label"
                  check
                  htmlFor="inline-radio1"
                >
                  Create
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  className="form-check-input"
                  type="radio"
                  id="inline-radio2"
                  name="inline-radios"
                  checked={this.state.createEdit === "Edit"}
                  onChange={() => this.setState({ createEdit: "Edit" })}
                  value="Edit"
                />
                <Label
                  className="form-check-label"
                  check
                  htmlFor="inline-radio2"
                >
                  Edit
                </Label>
              </FormGroup>
            </Col>
            <FormGroup row>
              <Col xs="12" sm="12" md="12">
                {this.state.createEdit === "Edit" && (
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>ClientName</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="select"
                        id="clientname"
                        name="clientname"
                        autoComplete="name"
                        value={this.state.selectedClient}
                        onChange={event => {
                          this.setState({
                            ...this.state,
                            selectedClient: event.target.value
                          });
                          this.loadClientDetails(event.target.value);
                        }}
                      >
                        {this.state.clientList}
                      </Input>
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fa fa-user" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="6" sm="6" md="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>First Name</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="input"
                      id="firstName"
                      name="clientname3"
                      autoComplete="name"
                      value={this.state.firstName}
                      onChange={event => {
                        this.setState({
                          ...this.state,
                          firstName: event.target.value
                        });
                      }}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fa fa-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs="6" sm="6" md="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Last Name</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="input"
                      id="lastName"
                      name="lastName"
                      autoComplete="name"
                      value={this.state.lastName}
                      onChange={event => {
                        this.setState({
                          ...this.state,
                          lastName: event.target.value
                        });
                      }}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fa fa-user" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col xs="6" sm="6" md="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Email</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      autoComplete="current-email"
                      value={this.state.email}
                      onChange={event => {
                        this.setState({
                          ...this.state,
                          email: event.target.value
                        });
                      }}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fa fa-envelope" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs="6" sm="6" md="6">
                
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Email</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="cellPhone"
                        name="cellPhone"
                        autoComplete="cellPhone"
                        value={this.state.cellPhone}
                        onChange={event => {
                          this.setState({
                            ...this.state,
                            cellPhone: event.target.value
                          });
                        }}
                      />
                      <InputGroupAddon addonType="append">
                        <InputGroupText>
                          <i className="fa fa-asterisk" />
                        </InputGroupText>
                      </InputGroupAddon>
                    </InputGroup>
                  </FormGroup>
            
              </Col>              
            </FormGroup>
          </div>
          <CardFooter style={{ textAlign: "right" }}>
            <Button
              type="submit"
              size="sm"
              color="primary"
              onClick={() => {
                this.submitRequest(
                  this.state.selectedClient,
                  this.state.firstName,
                  this.state.lastName,
                  this.state.email,
                  this.state.cellPhone
                );
              }}
            >
              <i className="fa fa-dot-circle-o" /> Submit
            </Button>
            <Button
              type="reset"
              size="sm"
              color="danger"
              onClick={() => this.props.history.push("/")}
            >
              <i className="fa fa-ban" /> Cancel
            </Button>
          </CardFooter>
        </div>
        {this.state.showAlert === true && (
          <Alert
            variant={this.state.alertType}
            message={this.state.alertMessage}
            toggleAlert={this.toggleAlert}
          />
        )}
      </div>
    );
  }
}

export default CreateClient;
