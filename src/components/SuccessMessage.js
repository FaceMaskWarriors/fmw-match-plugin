import React from "react";

const SuccessMessage = () => {
  return (
    <div className="messageformat">
      <div className="message">
        <div className="mysubmit">
          <p>Form Submitted Successfully</p>
          <button className="formOk" onClick={this.props.triggerParentUpdate}>
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
