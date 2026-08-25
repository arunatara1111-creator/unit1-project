import React from "react";

export default function StatsCards({
  done,
  total,
  weekAvgPct,
}) {
  return (
    <div className="rmc-stats">
      <div className="rmc-card rmc-stat-card">
        <div className="rmc-stat-label">
          Today
        </div>

        <div className="rmc-stat-value">
          {done}/{total} tasks
        </div>
      </div>

      <div className="rmc-card rmc-stat-card">
        <div className="rmc-stat-label">
          7-day average
        </div>

        <div className="rmc-stat-value">
          {weekAvgPct}%
        </div>
      </div>
    </div>
  );
}

