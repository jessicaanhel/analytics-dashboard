import React from "react";
import "../../App.css";

interface InfoPanelProps {
  title: string;
  value: string | number;
  color: "yellow" | "pink" | "blue";
}

const InfoPanel: React.FC<InfoPanelProps> = ({ title, value, color }) => {
  const className = `info-panel info-${color}`;
  return (
    <div className={className}>
      <div style={{ fontSize: "0.9rem" }}>{title}</div>
      <div style={{ fontSize: "1.3rem", marginTop: 4 }}>{value}</div>
    </div>
  );
};

export default InfoPanel;