import React, { Component } from "react";
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText  
} from "reactstrap";
import _ from "lodash";
import PanicLogic from "../logic/Panics";
import LoadingPanel from "../components/LoadingPanel";

const ENTER_KEY = 13;

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      panicList: [],
      showLoadingIndicator: false
    };
    this.search = this.search.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }
 
  handleClick(e) {
   this.search(this.state.value);
  }

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.search(this.state.value);
    }
  }

  search(value) {
    if (_.isEmpty(value)) return false;
    this.setState({ showLoadingIndicator: true });
    PanicLogic.panicSearch(value)
      .then(p => {
        if (p.success === 1) {             
          this.setState({
            ...this.state,
            value,
            panicList: p.message.panic,
            showLoadingIndicator: false
          });
          this.props.getSearchResult(p.message.panic);
        } else
          this.setState({
            ...this.state,
            showAlert: true,
            alertType: "danger",
            panicList: p.message,
            showLoadingIndicator: false
          });
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
  }
  render() {
    return (
      <div>
        <div xs={12} sm={12} md={12}>
          {this.state.showLoadingIndicator && <LoadingPanel />}
          <InputGroup>
            <Input
              style={{
                outline: "none",
                border: "none",
                width: "300px"
              }}
              placeholder="Enter panic number..."
              onChange={e => this.setState({ value: e.target.value })}
              onKeyDown={this.handleKeyDown}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i
                  className="fa fa-search"
                  onClick={e => this.handleClick()}
                  title="Search"
                />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
    );
  }
}
export default Search;
