import React from "react";
import axios from "axios";

export default class FluidForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      presetExemption: "Permissions Not Granted",
      commentReply: "Permissions Not Granted",
      limit: "Permissions Not Granted",
      auth: undefined
    };
  }

  loadData() {
    axios
      .get(`http://localhost:1337/config?token=${this.props.auth}`)
      .then(res => {
        this.setState({
          presetExemption: res.data.preset_exemption,
          commentReply: res.data.comment_reply,
          limit: res.data.pull_request_limit
        });
      });
  }

  componentWillReceiveProps(props) {
    this.setState({ auth: props.auth });
  }

  componentDidUpdate(previousProps, previousState) {
    if (previousProps.auth == undefined) {
      this.loadData();
    }
  }

  updateValue = (evt, key) => {
    this.setState({ [key]: evt.target.value });
  };

  persistData = e => {
    e.preventDefault();
    axios
      .post(`http://localhost:1337/config?token=${this.props.auth}`, {
        pull_request_limit: this.state.limit,
        preset_exemption: this.state.presetExemption
      })
      .then(data => alert("Settings Saved"));
  };

  render() {
    if (this.state.auth !== undefined) {
      return (
        <form className="ui form attached fluid segment">
          <div className="field">
            <label>
              Exemption Prefixes (PRs pre-fixes that the bot will ignore)
            </label>
            <input
              value={this.state.presetExemption}
              onChange={evt => this.updateValue(evt, "presetExemption")}
              placeholder="PRJ-127, PRJ-0000"
              type="text"
            />
          </div>
          <div className="field">
            <label>Max Number of Open Pull Requests Allowed</label>
            <input
              value={this.state.limit}
              onChange={evt => this.updateValue(evt, "limit")}
              placeholder="10"
              type="text"
            />
          </div>
          <div
            className="ui blue submit button"
            onClick={e => this.persistData(e)}
          >
            Save Settings
          </div>
        </form>
      );
    }
    return <span>Login</span>;
  }
}
