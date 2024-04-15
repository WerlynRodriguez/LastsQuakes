import type { ReactElement, ReactNode } from "react";

export interface IDropDownProps {
  button: ReactElement;
  options: Array<string>;
  itemRenderer: (item: string, index: number) => ReactElement;
  /**
   * A header for the items
   */
  itemsHeader?: ReactNode
  /**
   * On click an item, the dropdown will close?
   */
  itemLostFocus?: boolean;
  /**
   * Open the dropdown to the left or right
   */
  right?: boolean;
}
