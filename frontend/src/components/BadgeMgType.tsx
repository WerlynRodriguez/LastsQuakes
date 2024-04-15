import Badge from "./Badge";
import type { EMagnitudeType } from "../types/feature";
import type { IBadgeProps } from "../types/badge";

const ColorsByType: Record<EMagnitudeType, string> = {
  md: "#FF5733",
  ml: "#CD5C5C",
  ms: "#F08080",
  mw: "#FA8072",
  me: "#E9967A",
  mi: "#FFA07A",
  mb: "#FF5733",
  mlg: "#CD5C5C",
};

interface IBadgeMgTypeProps extends Omit<IBadgeProps, 'color' | 'children'> {
  magType: EMagnitudeType;
}

export const BadgeMgType = (props: IBadgeMgTypeProps) => {
  const { magType } = props;
  return (
    <Badge color={ColorsByType[magType]} {...props}>
      {magType}
    </Badge>
  );
};
