import { Rocket, Star } from "lucide-react";
import { TOKENS } from "../constants/tokens";

export default function ProgressCard({
  done,
  total,
  pct,
  launched,
}) {
  const radius = 27;

  const circumference =
    2 * Math.PI * radius;

  const progressColor = launched
    ? TOKENS.mint
    : TOKENS.coral;

  return (
    <div className="rmc-card progress-card">

      {/* Progress circle */}
      <div className="progress-circle">
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
        >
          {/* Background circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke={TOKENS.slate}
            strokeWidth="8"
          />

          {/* Progress circle */}
          <circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke={progressColor}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={
              circumference *
              (1 - pct / 100)
            }
            strokeLinecap="round"
            transform="rotate(-90 32 32)"
          />
        </svg>

        <div className="progress-circle__icon">
          <Rocket
            size={26}
            color={
              launched
                ? TOKENS.mintDeep
                : TOKENS.coral
            }
          />
        </div>
      </div>

      {/* Progress information */}
      <div className="progress-info">
        <div className="rmc-h1 progress-info__title">
          {launched
            ? "Liftoff! All done today"
            : `${done} of ${total} steps complete`}
        </div>

        <div className="progress-info__stars">
          <Star
            size={14}
            color={TOKENS.sunDeep}
            fill={TOKENS.sun}
          />

          {done} stars earned today
        </div>
      </div>
    </div>
  );
}