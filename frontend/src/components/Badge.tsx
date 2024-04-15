import type { IBadgeProps } from "../types/badge";
import { sizes } from "../types/badge";


export default function Badge({
  children,
  color = "black",
  size = sizes.medium,
}: IBadgeProps) {
  return (
    <span
      style={{
        textAlign: "center",
        padding: "0.2em 0.8em",
        borderRadius: "0.2em",
        fontSize: `${size}em`,
        fontWeight: "bold",
        opacity: 0.85,
        userSelect: "none",
        backgroundColor: color,
        color: "var(--color-base-100)",
      }}
    >
      {children}
    </span>
  );
}
