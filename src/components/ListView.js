import React, { Component } from "react";

class ListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limited: 60,
      showAll: false,
    };
  }

  showMore = () => this.setState({ showAll: true });

  showLess = () => this.setState({ showAll: false });

  render() {
    const { item, getColor } = this.props;
    const { limited, showAll } = this.state;
    const toShow = item.description.substring(0, limited) + "...";

    if (item.description && item.description.length <= limited) {
      return (
        <div className="grid_rows">
          <div className="cards">
            <div>{item.material}</div>
            <div>{item.zipcode}</div>
            <div>{item.description}</div>
          </div>
        </div>
      );
    } else if (showAll) {
      return (
        <div className="grid_rows">
          <div
            className="cards"
            style={{ backgroundColor: getColor(item.material) }}
          >
            <div>{item.material}</div>
            <div>{item.zipcode}</div>
            <div>
              {item.description}
              <a
                onClick={this.showLess}
                style={{ color: "darkblue", cursor: "pointer" }}
              >
                Read less
              </a>
            </div>
          </div>
        </div>
      );
    } else if (toShow) {
      return (
        <div className="grid_rows">
          <div
            className="cards"
            style={{ backgroundColor: getColor(item.material) }}
          >
            <div>{item.material}</div>
            <div>{item.zipcode}</div>
            <div>
              {toShow}
              <a
                onClick={this.showMore}
                style={{ color: "darkblue", cursor: "pointer" }}
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default ListView;
