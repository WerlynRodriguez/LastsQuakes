import DropDown from "./DropDown";
import type { IDropDownProps } from "../types/dropdown";
import Icon from "./Icon";

interface ISelectProps
  extends Omit<IDropDownProps, "itemRenderer" | "itemLostFocus"> {
  /**
   * Allow multiple selection?
   * This prop activates a new option to select and deselect all items.
   * If the value is empty, the button will select all items.
   */
  multiple?: boolean;
  value: Set<string>;
  onChange: (value: Set<string>) => void;
}

export default function (props: ISelectProps) {
  const { multiple = false, value, options, onChange } = props;

  const onClickOption = (option: string) => {
    if (!multiple) {
      onChange(new Set([option]));
      return;
    }
    
    const newValue = new Set(value);
    if (newValue.has(option)) {
      newValue.delete(option);
    } else {
      newValue.add(option);
    }
    onChange(newValue);
  };

  return (
    <DropDown
      itemLostFocus={!multiple}
      itemsHeader={
        multiple ? (
          <button
            className="text text-left"
            onClick={() =>
              onChange(new Set(value.size === options.length ? [] : options))
            }
          >
            {value.size === options.length
              ? "Deseleccionar todo"
              : "Seleccionar todo"}
          </button>
        ) : null
      }
      itemRenderer={(option) => (
        <button
          className={"text text-left" + (value.has(option) ? " selected" : "")}
          onClick={() => onClickOption(option)}
        >
          {option}
          {value.has(option) && <Icon name="check" />}
        </button>
      )}
      {...props}
    />
  );
}
