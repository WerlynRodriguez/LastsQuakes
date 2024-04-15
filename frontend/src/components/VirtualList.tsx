import { FixedSizeList as List } from "react-window";
import type { FixedSizeListProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import InfiniteLoader from "react-window-infinite-loader";

// The props are the same as the List component from react-window, but ommit width and height
interface IVirtualListProps
  extends Omit<FixedSizeListProps, "width" | "height" | "onItemsRendered"> {
  ref?: React.Ref<List>;
}

export default function VirtuaList(props: IVirtualListProps) {
  return (
    <InfiniteLoader
      isItemLoaded={(index) => index < props.itemCount}
      itemCount={props.itemCount}
      loadMoreItems={() => {}}
    >
      {({ onItemsRendered, ref }) => (
        <AutoSizer>
          {({ width, height }) => (
            <List 
              width={width} 
              height={height}
              ref={ref}
              onItemsRendered={onItemsRendered}
              {...props} 
            />
          )}
        </AutoSizer>
      )}
    </InfiniteLoader>
  );
}
