import React from "react";
import Table from "../components/Table";

//or use styles from admin/css.
const styles = {
  // color: 'blue',
  fontSize: 36,
  marginTop: 20,
};

function Front(props) {
  return (
    <div className="admin-wrappers" style={styles}>
      <Table />
      <Table />
    </div>
  );
}

export default Front;
