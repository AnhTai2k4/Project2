import React, { useState } from "react";
import "./Schedule.css";
import Header from "../../components/Header/Header";

export default function Schedule() {
  // State mẫu cho lịch tưới
  const [schedules, setSchedules] = useState([
    { time: "6:30", repeat: "Hàng ngày", amount: 500, enabled: false, days: [] },
    { time: "18:30", repeat: "T2, T4, T6", amount: 250, enabled: true, days: [2, 4, 6] },
  ]);
  // State cho form thêm mới
  const [form, setForm] = useState({
    time: "",
    repeatType: "daily",
    repeatEvery: 1,
    selectedDays: [3, 5, 7],
    amount: 500,
  });

  // Xử lý toggle bật/tắt lịch
  const handleToggle = idx => {
    setSchedules(schedules =>
      schedules.map((s, i) =>
        i === idx ? { ...s, enabled: !s.enabled } : s
      )
    );
  };

  // Xử lý xóa lịch
  const handleDelete = idx => {
    setSchedules(schedules => schedules.filter((_, i) => i !== idx));
  };

  // Xử lý chọn ngày trong tuần
  const handleSelectDay = day => {
    setForm(form => ({
      ...form,
      selectedDays: form.selectedDays.includes(day)
        ? form.selectedDays.filter(d => d !== day)
        : [...form.selectedDays, day],
    }));
  };

  // Xử lý thay đổi lượng nước
  const handleAmountChange = e => {
    setForm(form => ({
      ...form,
      amount: Number(e.target.value),
    }));
  };

  return (
    <div className="schedule-page-root">
    <Header />
    <div className="schedule-root">
        
      {/* Lịch tưới cây */}
      
      <div className="schedule-list-card">
        <div className="schedule-list-title">
          <span className="icon">🕒</span>
          Lịch tưới cây
        </div>
        <div className="schedule-list">
          {schedules.map((item, idx) => (
            <div
              className={`schedule-item${item.enabled ? " enabled" : ""}`}
              key={idx}
            >
              <div className="schedule-item-info">
                <div className="schedule-item-time">{item.time}</div>
                <div className="schedule-item-desc">
                  {item.repeat} | {item.amount}ml
                </div>
              </div>
              <div className="schedule-item-actions">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={item.enabled}
                    onChange={() => handleToggle(idx)}
                  />
                  <span className="slider"></span>
                </label>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(idx)}
                  title="Xóa"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Thêm lịch tưới mới */}
      <div className="schedule-form-card">
        <div className="schedule-form-title">
          <span className="icon">🗓️</span>
          Thêm lịch tưới mới
        </div>
        <div className="schedule-form-row">
          <label>Thời gian</label>
          <input
            type="time"
            value={form.time}
            onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
            className="schedule-input"
          />
        </div>
        <div className="schedule-form-row">
          <label>Lặp lại</label>
          <div className="schedule-repeat-options">
            <label>
              <input
                type="radio"
                name="repeatType"
                checked={form.repeatType === "daily"}
                onChange={() => setForm(f => ({ ...f, repeatType: "daily" }))}
              />
              Hàng ngày
            </label>
            <label>
              <input
                type="radio"
                name="repeatType"
                checked={form.repeatType === "every"}
                onChange={() => setForm(f => ({ ...f, repeatType: "every" }))}
              />
              Mỗi
              <input
                type="number"
                min={1}
                value={form.repeatEvery}
                onChange={e =>
                  setForm(f => ({
                    ...f,
                    repeatEvery: e.target.value,
                  }))
                }
                className="schedule-input schedule-input-small"
                disabled={form.repeatType !== "every"}
              />
              ngày
            </label>
            <div className="schedule-days">
              <span>Chọn ngày</span>
              {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((d, i) => (
                <button
                  key={i}
                  type="button"
                  className={
                    form.selectedDays.includes(i + 1)
                      ? "day-btn selected"
                      : "day-btn"
                  }
                  onClick={() => handleSelectDay(i + 1)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="schedule-form-row">
          <label style={{ width: "100%" }}>
            <input
              type="range"
              min={100}
              max={1000}
              step={50}
              value={form.amount}
              onChange={handleAmountChange}
              className="schedule-slider"
            />
            <div className="schedule-slider-label">{form.amount} ml</div>
          </label>
        </div>
        <div className="schedule-form-row" style={{ justifyContent: "flex-end" }}>
          <button className="schedule-save-btn">Lưu lịch tưới</button>
        </div>
      </div>
    </div>
    </div>
    
  );
}
