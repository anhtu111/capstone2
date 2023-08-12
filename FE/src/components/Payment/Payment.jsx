import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../NavBar/NavBar";

import "./Payment.css";
function Payment() {
  const location = useLocation();
  const selectedDateTime = location.state?.selectedDateTime;
  const [paymentInfo, setPaymentInfo] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Send payment information to server
  };

  return (
    <>
      <Navbar />
      <div>
        <div className="payment-desc">
          <h2 style={{ marginTop: "20px" }}>Payment</h2>
          <p style={{ marginTop: "20px" }}>
            You have selected the following date and time:
          </p>
          <p style={{ marginTop: "20px" }}>
            {selectedDateTime?.toLocaleString()}
          </p>
        </div>
        <form onSubmit={handleOnSubmit} className="payment-form">
          <label className="payment-label">
            Card Number:
            <input
              type="text"
              name="cardNumber"
              value={paymentInfo.cardNumber || ""}
              onChange={handleOnChange}
            />
          </label>
          <label className="payment-label">
            Expiration Date:
            <input
              className="payment-input"
              type="text"
              name="expirationDate"
              value={paymentInfo.expirationDate || ""}
              onChange={handleOnChange}
            />
          </label>
          <label className="payment-label">
            CVV:
            <input
              lassName="payment-input"
              type="text"
              name="cvv"
              value={paymentInfo.cvv || ""}
              onChange={handleOnChange}
            />
          </label>
          <button className="payment-btn" type="submit">
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
}

export default Payment;
