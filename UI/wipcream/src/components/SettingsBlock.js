import React from "react";

export default class SettingsBlock extends React.Component {
  state = {};
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div class="row">
          <h2 class="ui header">{this.props.header}</h2>
        </div>
        <div class="ui divider" />
        <div class="row">
          <div class="ui icon message">
            <i class={`${this.props.tooltipLogo} icon`} />
            <div class="content">
              <div class="header">{this.props.tooltipTitle}</div>
              <p>{this.props.description}</p>
            </div>
          </div>
        </div>
        <div class="row">{this.props.rowComponent}</div>
      </React.Fragment>
    );
  }
}
