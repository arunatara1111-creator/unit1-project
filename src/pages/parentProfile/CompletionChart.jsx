import React from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { TOKENS } from "../constants/tokens";

export default function CompletionChart({ week }) {
  const chartData = week.map((d) => ({
    ...d,
    pct: Math.round((d.done / d.total) * 100),
  }));

  return (
    <>
      <div
        style={{
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 8,
        }}
      >
        This week's completion
      </div>

      <div
        className="rmc-card"
        style={{
          border: `1px solid ${TOKENS.slateBorder}`,
          padding: 12,
          marginBottom: 24,
          height: 160,
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={TOKENS.slate}
              vertical={false}
            />

            <XAxis
              dataKey="label"
              tick={{
                fontSize: 11,
                fill: TOKENS.inkSoft,
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              hide
              domain={[0, 100]}
            />

            <Tooltip
              formatter={(value) => `${value}%`}
            />

            <Bar
              dataKey="pct"
              fill={TOKENS.sky}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
