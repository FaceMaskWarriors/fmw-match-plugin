import React, { Component } from "react/";
import GoogleMapReact from "google-map-react";

class MapView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMouseIn: false,
      showPopup: false,
    };
  }

  handleToggleOpen = (id) => {
    this.setState({
      showPopup: {
        [id]: true,
      },
    });
  };
  handleToggleClose = (id) => {
    this.setState({
      showPopup: false,
    });
  };

  render() {
    const { searchedMaterial, getColor } = this.props;

    return (
      <div>
        <div style={{ height: "60vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_KEY }}
            defaultCenter={{ lat: 37.09024, lng: -95.712891 }}
            defaultZoom={3}
          >
            {searchedMaterial.map((material, index) => (
              <Marker
                key={material.id}
                lat={material.lat}
                lng={material.lng}
                material={material}
                showPopup={this.state.showPopup}
                onOpen={() => this.handleToggleOpen(material.id)}
                onClose={this.handleToggleClose}
                getColor={getColor}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}
export default MapView;

const Marker = ({ material, showPopup, onOpen, getColor, onClose }) => {
  return (
    <div>
      <div
        style={{
          borderRadius: 30,
          backgroundColor: getColor(material.material),
          height: 15,
          width: 15,
        }}
        onClick={onOpen}
      />

      {showPopup[material.id] ? (
        <div className="popover__wrapper">
          <div className="popover__content">
            <div className="cancel-button" onClick={onClose}>
              X
            </div>
            <div className="popover__message">
              <div>
                <span>
                  <span className="popover__subtitle">Material Type:</span>
                  {material.material}
                </span>
              </div>
              <div>
                <span>
                  <span className="popover__subtitle">Zipcode:</span>
                  {material.zipcode}
                </span>
              </div>
              <div>
                <span>
                  <span className="popover__subtitle">Description:</span>
                  {material.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
