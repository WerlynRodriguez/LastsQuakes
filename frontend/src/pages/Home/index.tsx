import { useEffect, useRef, useState } from "react";
import VirtualList from "../../components/VirtualList";
import InfiniteLoader from "react-window-infinite-loader";
import CellFeature from "../../components/CellFeature";
import { EMagnitudeType } from "../../types/feature";
import Icon from "../../components/Icon";
import Select from "../../components/Select";
import Pagination from "../../components/Pagination";
import type { TPagination } from "../../types/metadata";
import type { TFeature, TFeatureCollection } from "../../types/feature";

import "./styles.css";
import { FeaturesApi } from "../../api";

function App() {
  const controllerRef = useRef<AbortController>(new AbortController());

  const [loadData, setLoadData] = useState<boolean>(false);
  const [features, setFeatures] = useState<TFeature[]>([]);

  const [mgFilter, setMgFilter] = useState<Set<string>>(new Set());
  const [paginOptions, setPaginOptions] = useState<TPagination>({
    current_page: 1,
    total: 0,
    per_page: 0,
  });

  useEffect(() => {
    getData();

    return () => {
      controllerRef.current.abort();
    };
  }, []);

  const getData = async () => {
    if (loadData) return;
    setLoadData(true);

    const url = FeaturesApi.getAll({
      page: paginOptions.current_page,
      per_page: 1000,
      mag_type: Array.from(mgFilter),
    });

    const data = await fetch(url, {
      signal: controllerRef.current.signal,
    })
      .then((res) => res.json())
      .catch((error) => {console.log(error) });

    setFeatures(data.data);
    setPaginOptions(data.pagination);

    setLoadData(false);
  };

  return (
    <>
      <header>
        <div className="join_container">
          <input type="search" placeholder="Ej: Cambria, CA" />

          <button
            className="primary rounded"
            aria-label="Buscar"
            onClick={getData}
          >
            <Icon name="search" />
          </button>

          <Select
            button={
              <button className="ghost" aria-label="Filtro">
                Tipo
                <Icon name="caret-down" />
              </button>
            }
            options={Object.values(EMagnitudeType)}
            value={mgFilter}
            onChange={setMgFilter}
            multiple
            right
          />
        </div>
        <br />
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Magnitud</th>
            </tr>
          </thead>
        </table>
      </header>

      <main>
        <InfiniteLoader
          isItemLoaded={(index) => index < features.length}
          itemCount={paginOptions.total}
          loadMoreItems={() => {}}
        >
          {({ onItemsRendered, ref }) => (
            <VirtualList
              itemData={features}
              itemCount={features.length}
              itemSize={window.innerHeight / 10}
              onItemsRendered={onItemsRendered}
              ref={ref}
            >
              {({ index, style }) => (
                <CellFeature {...features[index]} index={index} style={style} />
              )}
            </VirtualList>
          )}
        </InfiniteLoader>
      </main>

      <footer>
        <Pagination
          total={paginOptions.total}
          pageSize={paginOptions.per_page}
          current={paginOptions.current_page}
          onChange={(page) =>
            setPaginOptions({ ...paginOptions, current_page: page })
          }
        />
      </footer>
    </>
  );
}

export default App;
