import { memo } from "react";

const MIN_HEIGHT = 20;

export const HelperText = memo(function HelperText({ text }: { text?: string }) {
  return (
    <span
      style={{
        display: "block",
        minHeight: MIN_HEIGHT,
        lineHeight: "20px",
        visibility: text ? "visible" : "hidden",
      }}
    >
      {text ?? "placeholder"}
    </span>
  );
});
