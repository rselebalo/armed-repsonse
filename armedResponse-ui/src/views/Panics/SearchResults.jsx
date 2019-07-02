import React, { Component } from "react";
import ModalAlert from "../../components/Alert";
import "../../App.scss";
import {
  Button,
  Col,
  FormGroup,
  CardFooter
} from "reactstrap";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { filterBy, orderBy } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";
import history from "../../components/history";
import _ from "lodash";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.state = {
      status: "",
      selectedMember: "",
      panicList: props.panicList,
      filter: [],
      skip: 0,
      take: 20,
      total: 0,
      pageable: {
        buttonCount: 5,
        info: true,
        pageSizes: true,
        previousNext: true
      },
      sort: [{ field: "id", dir: "desc" }],
      searchText: ""
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      panicList: this.props.panicList
    });
  }
  componentWillReceiveProps(newProps) {
    this.setState({
      ...this.state,
      panicList: newProps.panicList
    });
  }
  toggleAlert(show) {
    this.setState({
      ...this.state,
      showAlert: show
    });
  }
  handleClick(evt) {
    const id = evt.target.innerHTML;
    this.props.getSearchResult([]);
    history.push(`/panic${id}`);
  }
  handlePageChange(evt) {
    this.setState({
      skip: evt.page.skip,
      take: evt.page.take
    });
  }

  export = () => {
    this._export.save();
  };
  _export;

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">          
          <div className="card-body">
            <Col md={8} sm={8} xs={8} className="mt-2">
              <strong>Search Results</strong>
            </Col>
            <FormGroup>
              <Grid
                data={orderBy(
                  filterBy(this.state.panicList, this.state.filter),
                  this.state.sort
                )}
                filterable
                filter={this.state.filter}
                onFilterChange={e => {
                  this.setState({
                    filter: e.filter
                  });
                }}
                skip={this.state.skip}
                take={this.state.take}
                total={this.state.panicList.length}
                pageable
                onPageChange={this.handlePageChange}
                sort={this.state.sort}
                onSortChange={e => {
                  this.setState({
                    ...this.state,
                    sort: e.sort
                  });
                }}
                sortable
              >
                <GridColumn field="streetAddress" title="Street Address" />
                <GridColumn field="coordinates" title="Coordinates" />
                <GridColumn field="timeLogged" title="timeLogged" />
                <GridColumn field="clientCellPhone" title="Client Cell Phone" />
                <GridColumn field="clientName" title="Client Name" />
                <GridColumn field="confirmed" title="Confirmed" />
                <GridColumn field="active" title="Active" />     
                <GridColumn
                  filterable={false}
                  field="id"
                  title="Panic Id"
                  cell={props => (
                    <td>
                      <Button
                        role="button"
                        block
                        color="primary"
                        onClick={this.handleClick}
                        onKeyPress={async props => {
                          try {
                            return history.push(
                              `/panic/${props.dataItem.id}`
                            );
                          } catch (error) {
                            return this.setState({
                              ...this.state,
                              showAlert: true,
                              alertMessage: `Failed to get Panic details. Error: ${
                                error.message
                              }`,
                              alertType: "danger"
                            });
                          }
                        }}
                        tabIndex={0}
                        className="primary"
                      >
                        {props.dataItem.id}
                      </Button>
                    </td>
                  )}
                />
              </Grid>
            </FormGroup>
          </div>
          <CardFooter>
            <div style={{ textAlign: "right" }}>
              <Button
                type="reset"
                size="sm"
                color="danger"
                onClick={() => this.props.getSearchResult([])}
              >
                <i className="fa fa-ban" /> Cancel
              </Button>
            </div>
          </CardFooter>
        </div>
        {this.state.showAlert === true && (
          <ModalAlert
            variant={this.state.alertType}
            message={this.state.alertMessage}
            toggleAlert={this.toggleAlert}
          />
        )}
      </div>
    );
  }
}
export default SearchResults;
