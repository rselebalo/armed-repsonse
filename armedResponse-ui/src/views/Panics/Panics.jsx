import React, { Component } from "react";
import PanicsLogic from "../../logic/Panics";
import ModalAlert from "../../components/Alert";
import PropTypes from "prop-types";
import "../../App.scss";
import { Button, Col, FormGroup } from "reactstrap";
import { Grid, GridColumn, GridToolbar } from "@progress/kendo-react-grid";
import { filterBy, orderBy } from "@progress/kendo-data-query";
import "@progress/kendo-theme-default/dist/all.css";
import {
  ExcelExport,
  ExcelExportColumn
} from "@progress/kendo-react-excel-export";
import LoadingPanel from "../../components/LoadingPanel";
import moment from "moment";
import _ from "lodash";

class Panics extends Component {
  constructor(props) {
    super(props);
    this.lastSelectedIndex = 0;
    this.getPanicList = this.getPanicList.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleAlert = this.toggleAlert.bind(this);
    this.modalConfirm = this.modalConfirm.bind(this);
    this.state = {
      status: "",
      panicList: [],
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
      sort: [{ field: "_id", dir: "desc" }],
      searchText: "",
      showLoadingIndicator: true
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      showLoadingIndicator: true
    });
    this.getPanicList(
      this.props.match.params.status,
      this.state.skip,
      this.state.take
    );
  }
  componentWillReceiveProps(newProps) {
    const status = newProps.match.params.status;
    this.setState({
      ...this.state,
      status: status,
      showLoadingIndicator: true
    });
    this.getPanicList(status, this.state.skip, this.state.take);
  }
  getPanicList(status, skip, take) {    
    PanicsLogic.getAllPanics(status, skip, take)
      .then(panic => {     
        const Panics = [];   
        panic.message.Panics.map(t => {
          let obj = {
            _id: "",
            clientNane: "",      
            email: "",
            clientCellPhone: "",
            streetAddress:"", 
            coordinates: "",
            confirmed: false,
            active: true,
            timeLogged: ""
          }
          // format time to readable string
          obj.timeLogged = moment(new Date(t.timeLogged))
            .clone()
            .format("DD/MM/YYYY HH:mm");
          obj._id = t._id;
          obj.clientName = t.client.name;
          obj.clientCellPhone = t.client.cellPhone;
          obj.streetAddress = t.streetAddress;
          obj.coordinates = `(${t.latitude}, ${t.longitude})`; 
          
         Panics.push(obj);
        });
        this.setState({
          ...this.state,
          panicList: Panics,
          total: Panics.length,
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
  
  modalConfirm() {
      this.props.history.push(`panics/${this.state.status}`);
  }
  toggleAlert(show) {
    this.setState({
      ...this.state,
      showAlert: show
    });
  }
  handleClick(evt) {
    const id = evt.target.innerHTML;
    this.props.history.push(`/panic/${id}`);
  }
  handlePageChange(evt) {
    this.setState({
      skip: evt.page.skip,
      take: evt.page.take,
      showLoadingIndicator: true
    });
    this.getPanicList(this.state.status, evt.page.skip, evt.page.take);
  }
  
  export = () => {
    this._export.save();
  };
  _export;

  render() {
    return (
      <div className="animated fadeIn">
        <div className="card">
          <div className="card-header">
            <FormGroup row className="my-0">
              <Col md={8} sm={8} xs={8} className="mt-2">                
                Panics
              </Col>
            </FormGroup>
          </div>
          <div className="card-body">
            <FormGroup>
              <ExcelExport
                data={this.state.panicList}
                ref={exporter => {
                  this._export = exporter;
                }}
              >
                <ExcelExportColumn field="streetAddress" title="Street Address" />
                <ExcelExportColumn field="coordinates" title="Coordinates" />
                <ExcelExportColumn field="timeLogged" title="Time Logged" />
                <ExcelExportColumn field="clientCellPhone" title="Client Cell Phone" />
                <ExcelExportColumn field="clientName" title="Client Name" />
                <ExcelExportColumn field="confirmed" title="Confirmed" />
                <ExcelExportColumn field="active" title="Active" />
                <ExcelExportColumn
                  field="_id"
                  title="Panic Id"
                />
              </ExcelExport>
              {this.state.showLoadingIndicator && <LoadingPanel />}
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
                total={this.state.total}
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
                <GridToolbar>
                  <FormGroup row className="my-0">
                    <Col xs={6} sm={6} md={6}>
                      <button
                        type="button"
                        title="Export to Excel"
                        className="k-button k-primary"
                        onClick={this.export}
                      >
                        Export to Excel
                      </button>
                    </Col>                    
                  </FormGroup>
                </GridToolbar>
                <GridColumn
                  filterable={false}
                  field="_id"
                  title="Panic Id"
                  cell={props => (
                    <td>
                      <Button
                        role="button"
                        block
                        color="primary"
                        onClick={this.handleClick}                        
                        tabIndex={0}
                        className="primary"
                      >
                        {props.dataItem._id}
                      </Button>
                    </td>
                  )}
                />
                <GridColumn field="streetAddress" title="Street Address" />
                <GridColumn field="coordinates" title="Coordinates" />
                <GridColumn field="timeLogged" title="Time Logged" />
                <GridColumn field="clientCellPhone" title="Client's Cell Phone" />
                <GridColumn field="clientName" title="Client Name" />
                <GridColumn field="confirmed" title="Confirmed" />
                <GridColumn field="active" title="Active" />                
              </Grid>
            </FormGroup>
          </div>
        </div>
        {this.state.showAlert === true && (
          <ModalAlert
            variant={this.state.alertType}
            message={this.state.alertMessage}
            toggleAlert={this.toggleAlert}
            modalConfirm={this.modalConfirm}
          />
        )}
      </div>
    );
  }
}
Panics.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
export default Panics;
