import React, { useState } from "react";
import Footer from "../../Footer/Footer";
import Navbar from "../../NavBar/NavBar";
import "./SuggestFootball.css";
import { useNavigate } from "react-router-dom";

export default function SuggestFootball() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/suggest");
  };
  const [videos, setVideos] = useState({
    tancong: "GLRa7hp31wk",
    phongngu: "IRmzdkCOx5U",
    quanguoi: "F_w_7VQBhHo",
    dutkiem: "0F1nL_yRMZA",
    triceps: "4hWJ5vDldx0",
    quanguoibuoc1: "i5TXm_PGIBY",
    phongngu11: "W90mt_Y2NtU",
  });

  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleLabelClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  return (
    <div className="muscle-body">
      <Navbar />

      <main>
        {selectedVideo && (
          <iframe
            className="video"
            src={`https://www.youtube.com/embed/${videos[selectedVideo]}`}
            allowFullScreen
            style={{
              width: "560px",
              height: "415px",
              border: "none",
              marginRight: "50px",
            }}
          />
        )}
        <div className="muscle-groups">
          <h1>HƯỚNG DẪN CÁC BÀI TẬP ĐÁ BÓNG</h1>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
              margin: "0 auto",
              fontSize: "16px",
            }}
          >
            <button
              style={{ marginTop: "80px" }}
              className="btn-suggest"
              onClick={() => handleLabelClick("tancong")}
            >
              Tấn công
            </button>
            <button
              className="btn-suggest"
              onClick={() => handleLabelClick("phongngu")}
            >
              Phòng ngự
            </button>
            <button
              className="btn-suggest"
              onClick={() => handleLabelClick("quanguoi")}
            >
              Qua người
            </button>
            <button
              className="btn-suggest"
              onClick={() => handleLabelClick("dutkiem")}
            >
              Dứt điểm
            </button>
            <button
              className="btn-suggest"
              onClick={() => handleLabelClick("triceps")}
            >
              Duy trì thể thực
            </button>
            <button
              className="btn-suggest"
              onClick={() => handleLabelClick("quanguoibuoc1")}
            >
              Qua người bước 1
            </button>
            <button
              className="btn-suggest"
              onClick={() => handleLabelClick("phongngu11")}
            >
              Phòng ngự 1 VS 1
            </button>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
              fontSize: "14px",
            }}
          >
            <button onClick={handleGoBack}>Quay lại</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
