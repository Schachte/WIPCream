import React from "react";
import ReactMde from "react-mde";
import axios from "axios";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

export default class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Permissions Not Granted",
      tab: "write"
    };

    this.converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true
    });
  }

  componentDidMount() {
    axios
      .get(`http://localhost:1337/config?token=${this.props.auth}`)
      .then(res => {
        const { comment_reply } = res.data;
        this.setState({ value: comment_reply });
      });
  }

  loadData() {
    axios
      .get(`http://localhost:1337/config?token=${this.props.auth}`)
      .then(res => {
        this.setState({
          value: res.data.comment_reply
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

  persistData(e) {
    e.preventDefault();
    axios
      .post(`http://localhost:1337/config?token=${this.props.auth}`, {
        comment_reply: this.state.value
      })
      .then(res => {
        alert("Settings Saved");
      })
      .catch(err => alert("Not Authenticated"));
  }

  handleValueChange = value => {
    this.setState({ value });
  };

  handleTabChange = tab => {
    this.setState({ tab });
  };

  render() {
    if (this.state.value !== "Permissions Not Granted") {
      return (
        <div className="container" style={{ width: "100%" }}>
          <ReactMde
            onChange={this.handleValueChange}
            value={this.state.value}
            generateMarkdownPreview={markdown =>
              Promise.resolve(this.converter.makeHtml(markdown))
            }
            selectedTab={this.state.tab}
            onTabChange={this.handleTabChange}
          />
          <div
            className="ui blue submit button"
            style={{ marginTop: "10px" }}
            onClick={e => this.persistData(e)}
          >
            Save Settings
          </div>
        </div>
      );
    }
    return <span>Login</span>;
  }
}
