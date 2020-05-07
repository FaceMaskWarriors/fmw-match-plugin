// Front WP side will use a short code
// renders list and map views
import React from "react";
import { render } from "react-dom";
import Front from "./containers/Front";

render(<Front />, document.getElementById("front-app"));
