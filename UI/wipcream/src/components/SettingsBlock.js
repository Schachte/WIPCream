import React from "react";

export default class SettingsBlock extends React.Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <div className="row">
          <h2 className="ui header">{this.props.header}</h2>
        </div>
        <div className="ui divider" />
        <div className="row">
          <div className="ui icon message">
            <i className={`${this.props.tooltipLogo} icon`} />
            <div className="content">
              <div className="header">{this.props.tooltipTitle}</div>
              <p>{this.props.description}</p>
            </div>
          </div>
        </div>
        <div className="row">{this.props.rowComponent}</div>
      </React.Fragment>
    );
  }
}
