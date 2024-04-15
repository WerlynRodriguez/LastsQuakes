import type { ReactNode } from "react";

export enum sizes {
  tiny = 0.5,
  small = 0.8,
  medium = 1,
  large = 1.5,
}

export interface IBadgeProps {
  children: ReactNode;
  color: string;
  size?: sizes;
}
