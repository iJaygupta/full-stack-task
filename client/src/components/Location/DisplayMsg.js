import React from 'react';

export default function DisplayMessage(props) {

  if (!props.hasOwnProperty('message')) {
    return (
      <div>
        <div className="card">
          <div className="card-body" >
            <h2 className="font-weight-bold" style={{ "textAlign": "center" }}> 404 Error, Page Not Found!</h2>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div>
        {props.message}
      </div>
    );
  }
}