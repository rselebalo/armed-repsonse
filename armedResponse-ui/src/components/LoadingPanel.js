import React, { Component } from "react";
import ReactDOM from "react-dom";

class LoadingPanel extends Component {
  render() {
    const loadingPanel = (
      <div className="k-loading-mask">
        <span className="k-loading-text">Loading</span>
        <div className="k-loading-image" />
        <div className="k-loading-color" />
      </div>
    );

    const gridContent = document && document.querySelector(".animated");
    return gridContent
      ? ReactDOM.createPortal(loadingPanel, gridContent)
      : loadingPanel;
  }
}
export default LoadingPanel;
