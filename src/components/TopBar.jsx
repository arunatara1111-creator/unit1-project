import React from "react";
import { ArrowLeft } from "lucide-react";
import { TOKENS } from "../constants/tokens";

export default function TopBar({
  title,
  onBack,
  accent,
}) {
  return (
    <div className="top-bar">
      {onBack && (
        <button
          className="rmc-btn top-bar__back"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft
            size={18}
            color={TOKENS.inkSoft}
          />
        </button>
      )}

      <div
        className="rmc-h1 top-bar__title"
        style={{
          color: accent || TOKENS.ink,
        }}
      >
        {title}
      </div>
    </div>
  );
}