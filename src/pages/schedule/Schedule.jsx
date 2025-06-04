import { useState, useEffect, useRef } from "react";
import { PropagateLoader } from "react-spinners";

import "./Schedule.css";
import Header from "../../components/Header/Header";
import trashIcon from "../../assets/dark_trash.svg";
import calendarIcon from "../../assets/calendar.svg";
import clockIcon from "../../assets/clock.svg";
import apiUrl from "../../config/api";

export default function Schedule() {
    const days = useRef({
        SUNDAY: "CN",
        MONDAY: "T2",
        TUESDAY: "T3",
        WEDNESDAY: "T4",
        THURSDAY: "T5",
        FRIDAY: "T6",
        SATURDAY: "T7",
    });
    // State mẫu cho lịch tưới
    const [schedules, setSchedules] = useState([
        {
            time: "6:30",
            repeat: "Hàng ngày",
            duration: 500,
            enabled: false,
            days: [],
        },
        {
            time: "18:30",
            repeat: "T2, T4, T6",
            duration: 250,
            enabled: true,
            days: [2, 4, 6],
        },
        {
            time: "18:30",
            repeat: "T2, T4, T6",
            duration: 250,
            enabled: true,
            days: [2, 4, 6],
        },
        {
            time: "18:30",
            repeat: "T2, T4, T6",
            duration: 250,
            enabled: true,
            days: [2, 4, 6],
        },
        {
            time: "18:30",
            repeat: "T2, T4, T6",
            duration: 250,
            enabled: true,
            days: [2, 4, 6],
        },
        {
            time: "18:30",
            repeat: "T2, T4, T6",
            duration: 250,
            enabled: true,
            days: [2, 4, 6],
        },
        {
            time: "18:30",
            repeat: "T2, T4, T6",
            duration: 250,
            enabled: true,
            days: [2, 4, 6],
        },
        {
            time: "18:30",
            repeat: "T2, T4, T6",
            duration: 250,
            enabled: true,
            days: [2, 4, 6],
        },
    ]);
    // State cho form thêm mới
    const [form, setForm] = useState({
        time: "",
        repeatType: "DAILY",
        repeatEvery: 1,
        selectedDays: [],
        duration: 10,
    });
    const [allPlans, setAllPlans] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleToggle = async (idx) => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        setAllPlans((plans) =>
            plans.map((plan, index) =>
                index === idx ? { ...plan, active: !plan.active } : plan
            )
        );

        const { planId, startDate, lastExecuteDate, active, ...plan } =
            allPlans[idx];

        try {
            const res = await fetch(
                `${apiUrl}/api/watering/change-plan/${planId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...plan, active: !active }),
                }
            );

            if (!res.ok) {
                throw new Error("Server error");
            }
        } catch (e) {
            console.error("Update plan error: ", e);

            setAllPlans((plans) =>
                plans.map((plan, index) =>
                    index === idx ? { ...plan, active: !plan.active } : plan
                )
            );
        }
    };

    // Xử lý xóa lịch
    const handleDelete = async (planId, idx) => {
        const token = sessionStorage.getItem("token");
        if (!token) return;

        // Lưu kế hoạch cần xóa để rollback nếu lỗi
        const deletedPlan = allPlans[idx];

        // Xóa ngay lập tức khỏi UI
        setAllPlans((plans) => plans.filter((_, i) => i !== idx));

        try {
            const res = await fetch(
                `${apiUrl}/api/watering/delete-plan/${planId}?deviceId=${sessionStorage.getItem(
                    "deviceId"
                )}`,
                {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!res.ok) {
                throw new Error("Server error");
            }
        } catch (e) {
            setAllPlans((plans) => {
                const newPlans = [...plans];
                newPlans.splice(idx, 0, deletedPlan);
                return newPlans;
            });
            console.error("Delete plan error: ", e);
        }
    };

    // Xử lý chọn ngày trong tuần
    const handleSelectDay = (day) => {
        setForm((form) => ({
            ...form,
            selectedDays: form.selectedDays.includes(day)
                ? form.selectedDays.filter((d) => d !== day)
                : [...form.selectedDays, day],
        }));
    };

    // Xử lý thay đổi lượng nước
    const handledurationChange = (e) => {
        setForm((form) => ({
            ...form,
            duration: Number(e.target.value),
        }));
    };

    const handleAddNewPlan = async () => {
        setIsLoading(true);
        const token = sessionStorage.getItem("token");
        if (!token) return;

        const sendRequest = async () => {
            return await fetch(`${apiUrl}/api/watering/new-plan`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    deviceId: sessionStorage.getItem("deviceId"),
                    deviceName: sessionStorage.getItem("device"),
                    time: form.time,
                    repeatType: form.repeatType,
                    intervalDays:
                        form.repeatType === "EVERY_X_DAYS"
                            ? form.repeatEvery
                            : 0,
                    weekDays:
                        form.repeatType === "WEEKDAYS" ? form.selectedDays : [],
                    duration: form.duration * 60,
                    active: true,
                }),
            });
        };

        try {
            if (token) {
                const res = await sendRequest();
                const data = await res.json();
                if (res.ok) {
                    setAllPlans((prev) => [data, ...prev]);
                }
            }
        } catch (e) {
            console.error("Add new plan erro: ", e);
        } finally {
            setIsLoading(false);
        }
    };

    const getAllPlans = async () => {
        const token = sessionStorage.getItem("token");

        const sendRequest = async () => {
            return await fetch(
                `${apiUrl}/api/watering/all-plan?deviceId=${sessionStorage.getItem(
                    "deviceId"
                )}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        };

        try {
            if (token) {
                const res = await sendRequest();
                if (res.ok) {
                    const data = await res.json();
                    setAllPlans(data);
                }
            }
        } catch (e) {
            console.error("Get all plans error: ", e);
        }
    };

    useEffect(() => {
        getAllPlans();
    }, []);

    return (
        <>
            <div
                className={`dark-overlay overlay overall-overlay ${
                    isLoading ? "" : "hidden"
                }`}
            >
                <PropagateLoader
                    color="#36d7b7"
                    loading={isLoading}
                    size={35}
                />
            </div>
            <div className="schedule-page-root">
                <Header />
                <div className="schedule-root">
                    {/* Lịch tưới cây */}

                    <div className="schedule-list-card scrollable">
                        <div className="schedule-list-title">
                            <img
                                src={clockIcon}
                                alt=""
                                className="medium-icon"
                            />
                            Lịch tưới cây
                        </div>
                        <div className="schedule-list">
                            {allPlans?.map((plan, idx) => (
                                <div
                                    className={`schedule-item${
                                        plan.active ? " enabled" : ""
                                    }`}
                                    key={idx}
                                >
                                    <div className="schedule-item-info">
                                        <div className="schedule-item-time">
                                            {plan.time.slice(0, 5)}
                                        </div>
                                        <div className="schedule-item-desc">
                                            {plan.repeatType === "DAILY"
                                                ? "Hàng ngày"
                                                : plan.repeatType === "WEEKDAYS"
                                                ? plan.weekDays
                                                      .map(
                                                          (day) =>
                                                              days.current[day]
                                                      )
                                                      .join(", ")
                                                : `${plan.intervalDays} ngày một lần`}{" "}
                                            | {plan.duration / 60} phút
                                        </div>
                                    </div>
                                    <div className="schedule-item-actions">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                checked={plan.active}
                                                onChange={() =>
                                                    handleToggle(idx)
                                                }
                                            />
                                            <span className="slider"></span>
                                        </label>
                                        <button
                                            className="delete-btn"
                                            onClick={() =>
                                                handleDelete(plan.planId, idx)
                                            }
                                            title="Xóa"
                                        >
                                            <img src={trashIcon} alt="" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {/* Thêm lịch tưới mới */}
                    <div className="schedule-form-card">
                        <div className="schedule-form-title">
                            <span className="icon">
                                <img
                                    src={calendarIcon}
                                    alt=""
                                    className="medium-icon"
                                />
                            </span>
                            Thêm lịch tưới mới
                        </div>
                        <div className="schedule-form-row">
                            <label>Thời gian</label>
                            <input
                                type="time"
                                value={form.time}
                                onChange={(e) =>
                                    setForm((f) => ({
                                        ...f,
                                        time: e.target.value,
                                    }))
                                }
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
                                        checked={form.repeatType === "DAILY"}
                                        onChange={() =>
                                            setForm((f) => ({
                                                ...f,
                                                repeatType: "DAILY",
                                            }))
                                        }
                                    />
                                    Hàng ngày
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="repeatType"
                                        checked={
                                            form.repeatType === "EVERY_X_DAYS"
                                        }
                                        onChange={() =>
                                            setForm((f) => ({
                                                ...f,
                                                repeatType: "EVERY_X_DAYS",
                                            }))
                                        }
                                    />
                                    Mỗi
                                    <input
                                        type="number"
                                        min={1}
                                        value={form.repeatEvery}
                                        onChange={(e) =>
                                            setForm((f) => ({
                                                ...f,
                                                repeatEvery: e.target.value,
                                            }))
                                        }
                                        className="schedule-input schedule-input-small"
                                        disabled={
                                            form.repeatType !== "EVERY_X_DAYS"
                                        }
                                    />
                                    ngày
                                </label>

                                <label>
                                    <input
                                        type="radio"
                                        name="repeatType"
                                        checked={form.repeatType === "WEEKDAYS"}
                                        onChange={() =>
                                            setForm((f) => ({
                                                ...f,
                                                repeatType: "WEEKDAYS",
                                            }))
                                        }
                                    />
                                    Chọn ngày
                                    {form.repeatType === "WEEKDAYS" && (
                                        <div className="schedule-days">
                                            {[
                                                { vie: "CN", en: "SUNDAY" },
                                                { vie: "T2", en: "MONDAY" },
                                                { vie: "T3", en: "TUESDAY" },
                                                { vie: "T4", en: "WEDNESDAY" },
                                                { vie: "T5", en: "THURSDAY" },
                                                { vie: "T6", en: "FRIDAY" },
                                                { vie: "T7", en: "SATURDAY" },
                                            ].map((d, i) => (
                                                <button
                                                    key={i}
                                                    type="button"
                                                    className={
                                                        form.selectedDays.includes(
                                                            d.en
                                                        )
                                                            ? "day-btn selected"
                                                            : "day-btn"
                                                    }
                                                    onClick={() =>
                                                        handleSelectDay(d.en)
                                                    }
                                                >
                                                    {d.vie}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </label>
                            </div>
                        </div>
                        <div className="schedule-form-row">
                            <label style={{ width: "100%" }}>
                                <input
                                    type="range"
                                    min={0.5}
                                    max={60}
                                    step={0.5}
                                    value={form.duration}
                                    onChange={handledurationChange}
                                    className="schedule-slider"
                                />
                                <div className="schedule-slider-label">
                                    {form.duration} phút
                                </div>
                            </label>
                        </div>
                        <div
                            className="schedule-form-row"
                            style={{ justifyContent: "flex-end" }}
                        >
                            <button
                                className="schedule-save-btn"
                                onClick={handleAddNewPlan}
                                disabled={
                                    !form.time ||
                                    (form.repeatType === "WEEKDAYS" &&
                                        form.selectedDays.length === 0)
                                }
                            >
                                Lưu lịch tưới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
