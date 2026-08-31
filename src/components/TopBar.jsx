
import React from "react";
import { ArrowLeft } from "lucide-react";

import { TOKENS } from "../pages/constants/tokens";
import Button from "./Button";

export default function TopBar({
  title,
  onBack,
  accent,
}) {
  return (
    <div className="rmc-topbar">

      {onBack && (
        <Button
          variant="secondary"
          className="rmc-back-btn"
          onClick={onBack}
          aria-label="Back"
        >
          <ArrowLeft
            size={18}
            color={TOKENS.inkSoft}
          />
        </Button>
      )}

      <div
        className="rmc-h1"
        style={{
          fontSize: 21,
          fontWeight: 700,
          color: accent || TOKENS.ink,
        }}
      >
        {title}
      </div>

    </div>
  );
}
