import { Fragment, cloneElement } from "react";
import type { IDropDownProps } from "../../types/dropdown";
import "./styles.css";

export default function (props: IDropDownProps) {
  const {
    button,
    options,
    itemRenderer,
    itemsHeader = null,
    itemLostFocus = true,
    right = false,
  } = props;

  return (
    <div
      className={`dropdown ${right && "right"} ${
        itemLostFocus && "item-lost_focus"
      }`}
    >
      {cloneElement(button, {
        className: `${button.props.className} dropdown-button`,
      })}

      <div className="dropdown-content">
        {itemsHeader}
        {options.map((option, index) => (
          <Fragment key={index}>{itemRenderer(option, index)}</Fragment>
        ))}
      </div>
    </div>
  );
}
