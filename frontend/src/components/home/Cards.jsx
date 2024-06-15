import React from "react";
import savings from "../../assets/home/saving.svg";
import devices from "../../assets/home/Devices.svg";
import chatbot from "../../assets/home/chat_bot.svg";

function Cards() {
  return (
    <div>
      <div className="card-group">
        <div className="card">
          <br />
          <img src={devices} alt="devices" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Universal Compatibility</h5>
            <p className="card-text">
              Our POS is compatible with all devices, for easy and hassle-free
              use.
            </p>
          </div>
        </div>
        <div className="card">
          <img src={savings} alt="savings" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Free Services</h5>
            <p className="card-text">
              Enjoy our services for free, with no hidden fees or additional
              costs.
            </p>
          </div>
        </div>
        <div className="card">
          <br />
          <img src={chatbot} alt="chatbot" className="card-img-top" />
          <div className="card-body">
            <h5 className="card-title">Customer Service</h5>
            <p className="card-text">
              Our customer service is available 24/7 to address all your needs.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
