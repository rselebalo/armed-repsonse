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
import { AppSwitch } from "@coreui/react";
// import { Typeahead } from "react-bootstrap-typeahead";
import LoadingPanel from "../../components/LoadingPanel";
import Alert from "../../components/Alert";
import PanicLogic from "../../logic/Panics";

class Panic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      clientName: "",      
      email: "",
      cellPhone: "",
      streetAddress:"", 
      long: 0,
      lat: 0,
      cordinates: "",
      confirmed: false,
      active: true,
      respondent:'',
      timeResolved: '',
      
      alertMessage: "",
      alertType: "",
      showAlert: false,
      showLoadingIndicator: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.submitRequest = this.submitRequest.bind(this);

    // preserve the initial state in a new object
    this.baseState = this.state;
  }

  componentDidMount() {
    // Fetch the clients to populate the select
    PanicLogic.getPanicById(this.props.match.params.id)
      .then(panic => {
        this.setState({
          ...this.state,
          _id: this.props.match.params.id,
          clientName: panic.client.name,      
          email: panic.client.email,
          cellPhone: panic.client.cellPhone,
          streetAddress:panic.streetAddress, 
          long: panic.longitude,
          lat: panic.latitude,
          cordinates: `(${panic.latitude}, ${panic.longitude})`,
          confirmed: panic.confirmed,
          active: panic.active,
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
    this.setState({
      [target.name]: target.value
    });
  }
  
  submitRequest() {
    // show loading indicator
    this.setState({ showLoadingIndicator: true });  
      // validate fields
      const obj = {
          clientName: this.state.clientName,      
          email: this.state.email,
          cellPhone: this.state.cellPhone,
          streetAddress:this.state.streetAddress, 
          long: this.state.long,
          lat: this.state.lat,
          cordinates: this.state.cordinates,
          confirmed: this.state.confirmed,
          active: this.state.active,
      };
      const isEmpty = Object.values(obj).some(
        x =>
          x === null ||
          x === "" ||
          x === undefined ||
          x === "NaN-NaN-NaN" ||
          x === "Place holder" ||
          x === "Please fill me..."
      );
      if (isEmpty) {
        return this.setState({
          ...this.state,
          showAlert: true,
          alertType: "danger",
          showLoadingIndicator: false,
          alertMessage: "Please capture all fields"
        });
      }
     
      PanicLogic.updatePanic(this.state)
        .then(res => {
          if (typeof res !== "object") {
            this.setState({
              ...this.state,
              alertMessage: res,
              alertType: "danger",
              showAlert: true,
              showLoadingIndicator: false
            });
          } else {
            const variant = res.success === 1 ? "success" : "danger";
            this.setState({
              ...this.state,
              alertMessage:
                res.success === 1
                  ? "Panic updated successfully"
                  : res.message,
              alertType: variant,
              showAlert: true,
              showLoadingIndicator: false,
              hideSubmit: true
            });
          }
        })
        .catch(err => {
          this.setState({
            ...this.state,
            showAlert: true,
            alertType: "danger",
            alertMessage: err.message,
            showLoadingIndicator: false
          });
        });
    
    // this.resetForm();
  }  
  
  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <i className="fa fa-align-justify" /> Panic
          </div>
          {this.state.showLoadingIndicator && <LoadingPanel />}
          <div className="card-body">  
            <FormGroup row>
              <Col xs="6" sm="6" md="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Client Name</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="input"
                      id="clientName"
                      name="clientname"
                      autoComplete="clientName"
                      value={this.state.clientName}
                      onChange={event => {
                        this.setState({
                          ...this.state,
                          clientName: event.target.value
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
                      <InputGroupText>CellPhone</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="input"
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
                        <InputGroupText>Street Address</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="streetAddress"
                        name="streetAddress"
                        autoComplete="streetAddress"
                        value={this.state.streetAddress}
                        onChange={event => {
                          this.setState({
                            ...this.state,
                            streetAddress: event.target.value
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
            <FormGroup row>
              <Col xs="6" sm="6" md="6">
                <FormGroup>
                  <InputGroup>
                    <InputGroupAddon addonType="prepend">
                      <InputGroupText>Latitude</InputGroupText>
                    </InputGroupAddon>
                    <Input
                      type="lat"
                      id="lat"
                      name="lat"
                      autoComplete="lat"
                      value={this.state.lat}
                      onChange={event => {
                        this.setState({
                          ...this.state,
                          lat: event.target.value
                        });
                      }}
                    />
                    <InputGroupAddon addonType="append">
                      <InputGroupText>
                        <i className="fa fa-asteric" />
                      </InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>
                </FormGroup>
              </Col>
              <Col xs="6" sm="6" md="6">                
                  <FormGroup>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>Longitude</InputGroupText>
                      </InputGroupAddon>
                      <Input
                        type="text"
                        id="long"
                        name="log"
                        autoComplete="long"
                        value={this.state.long}
                        onChange={event => {
                          this.setState({
                            ...this.state,
                            long: event.target.value
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
            <FormGroup row>
            <Col xs="6" sm="6" md="6" className="pull-left">
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Confirmed</InputGroupText>
                  </InputGroupAddon>                
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <AppSwitch
                  style={{ top: "10px" }}
                  className={"mx-1"}
                  variant={"pill"}
                  color={"primary"}
                  outline={"alt"}
                  checked={this.state.confirmed}
                  onChange={evt => {
                      this.setState({
                          ...this.state,
                          confirmed: evt.target.checked
                        });
                     }}
                  label
                  dataOn={"\u2713"}
                  dataOff={"\u2715"}
                        />
                    </InputGroupText>
                  </InputGroupAddon>      
                </InputGroup>
              </FormGroup>
              </Col>
              <Col xs="6" sm="6" md="6" style={{textAlign: "right"}}>
              <FormGroup>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>Confirmed</InputGroupText>
                  </InputGroupAddon>                
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                <AppSwitch
                  style={{ top: "10px" }}
                  className={"mx-1"}
                  variant={"pill"}
                  color={"primary"}
                  outline={"alt"}
                  checked={this.state.active}
                  onChange={evt => {
                      this.setState({
                          ...this.state,
                          active: evt.target.checked
                        });
                     }}
                  label
                  dataOn={"\u2713"}
                  dataOff={"\u2715"}
                        />
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
                this.submitRequest();
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

export default Panic;
