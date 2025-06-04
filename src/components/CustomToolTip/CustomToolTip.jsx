import { format } from "date-fns";

const CustomTooltip = ({ active, payload, label, attribute, unit }) => {
    if (active && payload && payload.length) {
        return (
            <div
                style={{
                    background: "#fff",
                    border: "1px solid #ccc",
                    padding: "8px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    color: "#333",
                }}
            >
                {label && (
                    <div>
                        <b>Thời gian:</b>{" "}
                        {format(new Date(label), "HH:mm dd/MM")}
                    </div>
                )}
                <div>{`${attribute}: ${payload[0].value}${unit}`}</div>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
