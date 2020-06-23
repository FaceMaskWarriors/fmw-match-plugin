import React, { Component } from "react";
import axios from "axios";
import Searchbar from "../components/Searchbar";
import ListView from "../components/ListView";
import MapView from "../components/MapView";

const MATERIALS = [
  { material: "Fabric", color: "#bc658d" },
  { material: "Interfacing", color: "#82c4c3" },
  { material: "Elastic", color: "#f9d89c" },
  { material: "Ribbon", color: "#f37121" },
  { material: "Sewing Machine", color: "#c47dd0b5" },
  { material: "3D Printer Materials", color: "#00a1ab" },
  { material: "Other", color: "#f2a365" },
];

class Front extends Component {
  constructor() {
    super();
    this.state = {
      showList: true,
      valueType: "",
      allMaterial: [],
      searchedMaterial: [],
    };
  }
  componentDidMount = () => {
    axios
      .get("https://my-json-server.typicode.com/andreaHG/test-db/posts")
      .then((response) => {
        this.setState({
          allMaterial: response.data,
          searchedMaterial: response.data,
        });
      });
  };

  handleOnChange = (e) => {
    this.setState({ valueType: e.target.value });
  };

  OnSubmit = (e) => {
    // e.preventDefault();
    const { valueType } = this.state;
    this.filteredData(valueType);
  };

  togglePopup = (state) => {
    this.setState({
      showList: state,
    });
  };

  getColor = (materialType) => {
    const defaultColor = "#F2A365";
    const colorObj = MATERIALS.find(
      (material) => material.material === materialType
    );

    const color = !colorObj ? defaultColor : colorObj.color;
    return color;
  };

  filteredData = (searchString) => {
    const { allMaterial } = this.state;
    const normalizeData = searchString.toLowerCase();
    const keys = ["material", "zipcode", "description"];

    let filteredMaterial = allMaterial.filter((material) => {
      return keys.some((key) =>
        material[key].toLowerCase().includes(normalizeData)
      );
    });

    this.setState({
      searchedMaterial: filteredMaterial,
    });
  };

  resetSearch = () => {
    this.setState({ searchedMaterial: this.state.allMaterial });
  };

  render() {
    const { searchedMaterial, allMaterial } = this.state;

    return (
      <div className="wrapper">
        <div className="heading">
          <h2>Thank you for Volunteering!</h2>
        </div>
        <div>
          <p className="thankpage">
            Thank you for contributing to the cause. Please use the map and
            filter to find and contact other donors and volunteers in your area
            to coordinate acquiring what you need!
          </p>
        </div>
        <div className="maplistbuttons">
          <button
            className="buttonstyle"
            type="button"
            onClick={() => this.togglePopup(false)}
          >
            Map
          </button>
          <button
            className="buttonstyle"
            type="button"
            onClick={() => this.togglePopup(true)}
          >
            List
          </button>
        </div>

        <div className="search-fields">
          <div className="searchbox">
            <Searchbar
              handleOnChange={this.handleOnChange}
              OnSubmit={this.OnSubmit}
            />
            <div className="materialButtons">
              <p style={{ paddingLeft: "8px" }}>Filter by:</p>

              {MATERIALS.map((material, index) => {
                return (
                  <button
                    className="button-material-type"
                    type="submit"
                    key={index}
                    style={{
                      backgroundColor: this.getColor(material.material),
                    }}
                    onClick={() => this.filteredData(material.material)}
                  >
                    {material.material}
                  </button>
                );
              })}
              <button
                className="reset-button"
                type="submit"
                onClick={this.resetSearch}
              >
                Reset
              </button>
            </div>
          </div>
          {this.state.showList ? (
            <div className="grid">
              <div className="list-view-column">
                <div>Material</div>
                <div>Zipcode</div>
                <div>Description</div>
              </div>
              {searchedMaterial &&
                searchedMaterial.map((item, index) => {
                  return (
                    <ListView
                      key={index}
                      item={item}
                      getColor={this.getColor}
                    />
                  );
                })}
            </div>
          ) : (
            <div className="mapbox">
              <MapView
                searchedMaterial={searchedMaterial}
                getColor={this.getColor}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
export default Front;
