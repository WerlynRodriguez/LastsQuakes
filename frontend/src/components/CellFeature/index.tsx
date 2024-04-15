import { sizes } from "../../types/badge";
import type { TFeature } from "../../types/feature";
import { BadgeMgType } from "../BadgeMgType";
import "./styles.css";

interface ICellFeatureProps extends TFeature {
  index: number;
  style?: React.CSSProperties;
  className?: string;
}

export default function CellFeature(props: ICellFeatureProps) {
  const { attributes, className, index } = props;
  const { title, mag_type, magnitude } = attributes;

  return (
    <div style={props.style} className={`cell-feature ${index % 2 === 0 ? "even" : ""} ${className}`}>
      {title}
      <BadgeMgType magType={mag_type} size={sizes.small} />
      <p>{magnitude}</p>
    </div>
  );
}
