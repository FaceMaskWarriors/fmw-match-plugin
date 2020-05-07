import React, { Component } from "react";
import Table from "../components/Table";

//or use styles from admin/css.
const styles = {
  // color: 'blue',
  fontSize: 36,
  marginTop: 20,
};

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.getPages();
  }

  getPages = () => {
    // testing WP API
    // TODO: add in axios
    fetch("/wp-json/wp/v2/pages")
      .then((response) => response.json())
      .then((posts) => console.log(posts));
  };

  render() {
    return (
      <div className="admin-wrappers" style={styles}>
        <Table />
      </div>
    );
  }
}

export default Admin;
