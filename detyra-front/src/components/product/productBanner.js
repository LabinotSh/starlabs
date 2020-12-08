import React from "react";
import "./banner.css";

function Banner() {
  return (
    <div className="Banner">
      <div className="my-container text-center">
        <div className="text-center">
          <h1 className="Banner-title pt-3 pb-2">
            <span className="my"></span> Product List</h1>
          <div className="anime text-light">
            This table contains all the products available and their data!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
