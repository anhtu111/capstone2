import React from "react";
import moment from "moment";
import paymentSuccessImg from "./payment-success.png";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import Navbar from "../../NavBar/NavBar";
import Footer from "../../Footer/Footer";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  // format date
  const payDate = moment(queryParams.vnp_PayDate, "YYYYMMDDHHmmss");
  const formattedPayDate = payDate.format("DD/MM/YYYY - HH:mm:ss");
  // format amount - 00
  const amount = queryParams.vnp_Amount;
  const formattedAmount = amount.slice(0, -2);

  console.log(queryParams);
  console.log(formattedPayDate);

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div>
      <Navbar />
      <div
        style={{
          maxWidth: 680,
          margin: "0 auto",
          padding: "45px 30px 60px",
          background: "#f4f7ff",
          backgroundImage:
            "url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner)",
          backgroundRepeat: "no-repeat",
          backgroundSize: "800px 452px",
          backgroundPosition: "top center",
          fontSize: 14,
          color: "#434343",
        }}
      >
        <div>
          <div
            style={{
              margin: 0,
              marginTop: 70,
              padding: "40px 30px",
              background: "#ffffff",
              borderRadius: 30,
            }}
          >
            <div
              className="image-success"
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src={paymentSuccessImg}
                alt="Payment Success"
                style={{ width: "50%", marginBottom: "30px" }}
              />
            </div>
            <div style={{ margin: "0 auto", maxWidth: 422 }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: 24,
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                THANH TOÁN THÀNH CÔNG
              </h1>
              <p
                style={{
                  margin: 0,
                  marginTop: 17,
                  fontSize: 16,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                CHI TIẾT
              </p>
              <p
                style={{
                  margin: 0,
                  marginTop: 17,
                  fontWeight: 500,
                  textAlign: "center",
                }}
              >
                {/* Tuyệt vời, bạn đã thanh toán thành công với mã đơn hàng:{" "} */}
                {/* <span style={{ color: "#499fb6" }}>#12465d34d45</span>. */}
              </p>
            </div>
            <table
              style={{
                marginTop: 40,
                width: "100%",
                borderRadius: 15,
                overflow: "hidden",
                border: "1px solid #f0f0f0",
                borderCollapse: "separate",
                borderSpacing: 0,
              }}
            >
              <tbody>
                <tr>
                  <th
                    style={{
                      width: "50%",
                      padding: 20,
                      color: "#000000",
                      background: "rgba(73, 159, 182, 0.3)",
                      borderRight: "1px solid #f0f0f0",
                      textAlign: "center",
                    }}
                  >
                    Mã đơn hàng
                  </th>
                  <th
                    style={{
                      width: "50%",
                      padding: 20,
                      color: "#000000",
                      background: "rgba(73, 159, 182, 0.3)",
                      textAlign: "center",
                    }}
                  >
                    Ngày
                  </th>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: 20,
                      textAlign: "center",
                      borderRight: "1px solid #f0f0f0",
                      fontWeight: 500,
                    }}
                  >
                    {queryParams.vnp_TmnCode}
                  </td>
                  <td
                    style={{
                      padding: 20,
                      textAlign: "center",
                      fontWeight: 500,
                    }}
                  >
                    {formattedPayDate}
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="infor-payment">
              <div
                className="infor-payment-success"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "50px",
                }}
              >
                <h2 style={{ fontWeight: "bold" }}>Tên ngân hàng:</h2>
                <h2>{queryParams.vnp_BankCode}</h2>
              </div>
              <div
                className="infor-payment-success"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 style={{ fontWeight: "bold" }}>Mã giao dịch:</h2>
                <h2>{queryParams.vnp_BankTranNo}</h2>
              </div>
              <div
                className="infor-payment-success"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 style={{ fontWeight: "bold" }}>Thông tin đơn hàng:</h2>
                <h2>{queryParams.vnp_OrderInfo}</h2>
              </div>
              <div
                className="infor-payment-success"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <h2 style={{ fontWeight: "bold" }}>Số tiền:</h2>
                <h2>
                  {formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    " VNĐ"}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button onClick={handleNavigateHome}>Về trang chủ</button>
        </div>

        <footer
          style={{
            width: "100%",
            maxWidth: 490,
            margin: "20px auto 0",
            textAlign: "center",
            borderTop: "1px solid #e6ebf1",
          }}
        >
          <p
            style={{
              margin: 0,
              marginTop: 40,
              fontSize: 16,
              fontWeight: 600,
              color: "#434343",
            }}
          >
            C2SE.28 - SCM
          </p>
          <p style={{ margin: 0, marginTop: 8, color: "#434343" }}>
            254 Nguyen Van Linh, Quan Thanh Khe, TP. Da Nang
          </p>
          <div style={{ margin: 0, marginTop: 16 }}>
            <a href="" target="_blank" style={{ display: "inline-block" }}>
              <img
                width="36px"
                alt="Facebook"
                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook"
              />
            </a>
            <a
              href=""
              target="_blank"
              style={{ display: "inline-block", marginLeft: 8 }}
            >
              <img
                width="36px"
                alt="Instagram"
                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram"
              />
            </a>
            <a
              href=""
              target="_blank"
              style={{ display: "inline-block", marginLeft: 8 }}
            >
              <img
                width="36px"
                alt="Twitter"
                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter"
              />
            </a>
            <a
              href=""
              target="_blank"
              style={{ display: "inline-block", marginLeft: 8 }}
            >
              <img
                width="36px"
                alt="Youtube"
                src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube"
              />
            </a>
          </div>
        </footer>
      </div>
      <Footer />
    </div>
  );
}
