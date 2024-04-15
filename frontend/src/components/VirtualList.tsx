import { FixedSizeList as List } from "react-window";
import type { FixedSizeListProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

// The props are the same as the List component from react-window, but ommit width and height
interface IVirtualListProps
  extends Omit<FixedSizeListProps, "width" | "height"> {
    ref?: React.Ref<List>;
}

export default function VirtuaList(props: IVirtualListProps) {
  return (
    <AutoSizer>
      {({ width, height }) => (
        <List
          width={width}
          height={height}
          {...props}
        />
      )}
    </AutoSizer>
  );
}
