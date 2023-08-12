import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-distributed">
      <div className="footer-left">
        <h3 className="footer-left-title">
          C2SE.28 -<span> SCM</span>
        </h3>
        <div className="footer-company-name">
          Tập luyện thể dục giúp cải thiện sức khỏe, giảm cân, tăng cơ bắp và
          cải thiện ngoại hình. Trang web của chúng tôi cung cấp các câu lạc bộ
          và nhân viên huấn luyện chuyên nghiệp để hỗ trợ và cung cấp lộ trình
          tập luyện phù hợp cho bạn. Hãy bắt đầu quá trình tập luyện của bạn tại
          đây!
        </div>
      </div>
      <div className="footer-left-2 ">
        <h4 className="footer-center-title">QUICK LINKS</h4>

        <p className="footer-links">
          <a href="#" className="link-1">
            Home
          </a>
          <a href="#">Blog</a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </p>
      </div>
      <div className="footer-center">
        <div className="footer-center-title">CONTACT</div>
        <div className="footer-center-desc">
          <div>
            <i className="fa fa-map-marker"></i>
            <p style={{ color: "#b9b6b6" }}>
              <span>254 Nguyễn Văn Linh, </span>
              <span>Quận Thanh Khê, TP. Đà Nẵng.</span>
            </p>
          </div>
          <div>
            <i className="fa fa-phone"></i>
            <p style={{ color: "#b9b6b6" }}>0923.557.355</p>
          </div>
          <div>
            <i className="fa fa-envelope"></i>
            <p style={{ color: "#b9b6b6" }}>
              <a href="mailto:support@company.com">namkhangphan218@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
      <div className="footer-right">
        <div className="footer-company-about">
          <span style={{ fontSize: "20px" }}>ABOUT THE PROJECT</span>
          <p
            style={{
              marginTop: "50px",
              textAlign: "justify",
              lineHeight: "1.8",
              fontSize: "16px",
              color: "#b9b6b6",
            }}
          >
            Dự án của chúng tôi cung cấp giải pháp về đặt câu lạc bộ thể thao
            trực tuyến. Thanh toán an toàn, hỗ trợ 24/24 và các dịch vụ khác.
          </p>
        </div>

        <div className="footer-icons">
          <a href="#">
            <img src="./img/footer/fb.svg" alt="" />
          </a>
          <a href="#">
            <img src="./img/footer/twitter.svg" alt="" />
          </a>
          <a href="#">
            <img src="./img/footer/linkedin.svg" alt="" />
          </a>
          <a href="#">
            <img src="./img/footer/github.svg" alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
