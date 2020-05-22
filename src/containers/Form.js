import React, { Component } from "react";
import Table from "../components/Table";

//or use styles from admin/css.
const styles = {
  // color: 'blue',
  fontSize: 36,
  marginTop: 20,
};

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.getCustomEndpoint();
  }

  getCustomEndpoint = () => {
    // TODO: add API wrappers
    fetch("/wp-json/fmw-map/test")
      .then((response) => response.json())
      .then((posts) => console.log(posts));
  };

  updateInput = (event) => {
    this.setState({
      exampleSetting: event.target.value,
    });
  };

  render() {
    return (
      <div className="wrap">
        <form>
          <h2>Form</h2>
          <label>
            Email
            <input
              type="text"
              value={this.state.exampleSetting}
              onChange={this.updateInput}
            />
          </label>
          <button
            id="submit"
            className="button button-primary"
            onClick={this.handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
export default Form;
