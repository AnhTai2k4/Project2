import React from "react";
import "./Machine.css";
import Header from "../../components/Header/Header";

export default function Machine() {
  return (
    <div className="machine-root">
        <Header />
      <div className="machine-main">
        <div className="machine-cards">
          <div className="machine-row">
            {/* Nhiệt độ */}
            <div className="machine-card top1">
              <div className="machine-card-header">
                <span className="icon">🌡️</span>
                <span className="label">Nhiệt độ</span>
                <span className="value">27.5°C</span>
              </div>
              <div className="machine-card-content">
                <div className="bold">Biểu đồ</div>
                <div>gì đó</div>
              </div>
            </div>
            {/* Độ ẩm không khí */}
            <div className="machine-card top2">
              <div className="machine-card-header">
                <span className="icon-small">🍃</span>
                <div>
                  <div className="label">Độ ẩm</div>
                  <div className="sub-label">không khí</div>
                </div>
                <span className="value">68%</span>
              </div>
              <div className="machine-card-content">
                <div className="bold">Biểu đồ</div>
                <div>gì đó</div>
              </div>
            </div>
          </div>
          <div className="machine-row">
            {/* Độ ẩm đất */}
            <div className="machine-card top4">
              <div className="machine-card-header">
                <span className="icon-small">💧</span>
                <div>
                  <div className="label">Độ ẩm</div>
                  <div className="sub-label">trong đất</div>
                </div>
                <span className="value">42%</span>
              </div>
              <div className="machine-card-content">
                <div className="bold">Biểu đồ</div>
                <div>gì đó</div>
              </div>
            </div>
            {/* Cường độ ánh sáng */}
            <div className="machine-card top5">
              <div className="machine-card-header">
                <span className="icon-small">☀️</span>
                <div>
                  <div className="label">Cường độ</div>
                  <div className="sub-label">ánh sáng</div>
                </div>
                <span className="value">825 lux</span>
              </div>
              <div className="machine-card-content">
                <div className="bold">Biểu đồ</div>
                <div>gì đó</div>
              </div>
            </div>
          </div>
        </div>
        {/* Card bơm nước */}
        <div className="machine-pump-col">
          <div className="machine-card top3 machine-pump-card">
            <div style={{ width: "100%", marginBottom: 8 }}>
              <div className="machine-card-header">
                <span className="icon">🛠️</span>
                <div style={{ flex: 1 }}>
                  <div className="machine-pump-bar">
                    <div className="machine-pump-bar-inner"></div>
                    <span className="machine-pump-bar-label">500 ml</span>
                  </div>
                </div>
              </div>
              <button className="machine-pump-btn">Bơm ngay</button>
            </div>
            <div style={{ width: "100%" }}>
              <table className="machine-pump-table">
                <thead>
                  <tr>
                    <th>Thời điểm</th>
                    <th>Lượng nước</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>14/04/2025 22:30</td>
                    <td>100 ml</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}