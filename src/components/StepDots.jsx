// Minor component — takes a routine's steps as a prop, renders nothing else.
export default function StepDots({ steps }) {
    return (
      <div className="step-dots">
        {steps.map((step) => (
          <span
            key={step.id}
            className={step.done ? "dot dot-done" : "dot"}
          />
        ))}
      </div>
    );
  }
  