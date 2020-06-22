import React, { Component, Fragment } from "react";
import axios from "axios";
import SuccessMessage from "../components/SuccessMessage";

const MATERIALS = [
  "Fabric",
  "Interfacing",
  "Thread",
  "Elastic",
  "Ribbon",
  "Sewing Machine",
  "3D Printer Materials",
];

class DonateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
      materialType: "",
      description: "",
      zipcode: "",
      email: "",
      showOtherInput: false,
      otherMaterial: "",
      isSubmitted: false,
      checked: false,
      options: [],
    };
  }

  handleCheckClick = () => {
    this.setState({ isChecked: !this.state.isChecked });
  };

  handleOnChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  changedCheck = (event, index) => {
    const options = this.state.options;
    if (event.target.checked === true) {
      this.setState({
        [event.target.name]: event.target.value,
      });
      options.push(event.target.value);
    } else {
      let valueIndex = options.indexOf(event.target.value);
      options.splice(index, 1);
      this.setState({ options: options });
      console.log(options);
    }
  };

  addOtherMaterial = () => {
    this.setState({ showOtherInput: !this.state.showOtherInput });
  };

  closePopup = () => {
    this.setState({
      isSubmitted: false,
      description: " ",
      zipcode: " ",
      email: " ",
      otherMaterial: " ",
      isChecked: false,
      check: false,
    });
  };

  onSubmit = (event) => {
    event.preventDefault();
    let formObj = {
      category: this.state.options,
      // otherMaterial: this.state.otherMaterial,
      description: this.state.description,
      // zipcode: this.state.zipcode,
      email: this.state.email,
      // dummy data below
      location_lat: 36.061184,
      location_lng: -78.8856832,
      location_name: "Club Boulevard Elementary School",
    };

    console.log("submitForm", formObj);
    this.addDonation(formObj);
  };

  addDonation = (data) => {
    axios
      .post("/wp-json/fmw-map/donation", { data })
      .then((response) => {
        console.log(response);
        this.setState({ isSubmitted: !this.state.isSubmitted });
      })
      .catch((err) => console.log(err));
  };

  render() {
    return (
      <Fragment>
        {this.state.isSubmitted ? (
          <SuccessMessage triggerParentUpdate={this.closePopup} />
        ) : (
          <div className="formformat">
            <div className="labelspace">
              <label>Material Type</label>
              {MATERIALS.map((material, index) => {
                return (
                  <label className="labeling" key={index}>
                    <input
                      type="checkbox"
                      name={material}
                      value={MATERIALS[index]}
                      onChange={(material) => this.changedCheck(material)}
                    />
                    {material}
                  </label>
                );
              })}
            </div>
            <label className="labeling">
              <input type="checkbox" onClick={this.addOtherMaterial} />
              other
            </label>
            {this.state.showOtherInput ? (
              <div>
                <input
                  type="text"
                  value={this.state.otherMaterial}
                  name="otherMaterial"
                  onChange={this.handleOnChange}
                  onClick={this.handleCheckClick}
                />
              </div>
            ) : null}
            <div className="labelspace">
              <label>Description</label>
            </div>

            <textarea
              className="description"
              name="description"
              value={this.state.description}
              onChange={this.handleOnChange}
              placeholder="Description"
              required
            />
            <div className="labelspace">
              <label>Zipcode</label>
            </div>
            <input
              type="number"
              pattern="[0-9]{5}"
              required
              className="inputbox"
              name="zipcode"
              placeholder="Zipcode"
              value={this.state.zipcode}
              onChange={this.handleOnChange}
              placeholder="Zipcode"
            />
            <div>
              <label className="labelspace">Email</label>
            </div>
            <input
              required
              type="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleOnChange}
              className="inputbox"
              placeholder="Email"
              required
            />
            <div className="submitbutton1" onClick={this.closeSelf}>
              <button
                onClick={this.onSubmit}
                style={{ marginTop: 20 }}
                type="submit"
                value="submit"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}
export default DonateForm;
