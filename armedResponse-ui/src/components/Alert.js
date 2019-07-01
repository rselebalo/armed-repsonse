import React, { Component } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Col
} from "reactstrap";
import { Link } from "react-router-dom";
import _ from "lodash";
import history from "./history";

class Alerts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modal: true
    };

    this.toggle = this.toggle.bind(this);
  }
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
    this.props.toggleAlert(!this.state.modal);
  }
  render() {
    return (
      <Modal
        isOpen={this.state.modal}
        toggle={this.toggle}
        className={`modal-${this.props.variant} ` + this.props.className}
      >
        <ModalHeader toggle={this.toggle}>Information</ModalHeader>
        <ModalBody>
          {this.props.message}
          {!_.isUndefined(this.props.panicId) && (
            <Col
              xs={12}
              sm={12}
              md={12}
              className="py-3 my-0"
              style={{ textAlign: "right" }}
            >
              <Link
                to={`/panic/${this.props.panicId}`}
                target="_blank"
                params={{ id: `${this.props.panicId}` }}
              >
                {" "}
                Go to Panic{" "}
              </Link>              
            </Col>
          )}
        </ModalBody>
        <ModalFooter>
          {this.props.variant !== "danger" && (
            <Button
              color="primary"
              onClick={() => {
                this.toggle();
                if (!_.isUndefined(this.props.modalConfirm)) {
                  this.props.modalConfirm(true);
                }
                history.push();
              }}
            >
              Okay
            </Button>
          )}
          <Button color="secondary" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

export default Alerts;
