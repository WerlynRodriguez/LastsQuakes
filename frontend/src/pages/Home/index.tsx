import { useEffect, useRef, useState } from "react";
import VirtualList from "../../components/VirtualList";
import CellFeature from "../../components/CellFeature";
import { EMagnitudeType } from "../../types/feature";
import Icon from "../../components/Icon";
import Select from "../../components/Select";
import Pagination from "../../components/Pagination";
import type { TPagination } from "../../types/metadata";
import type { TFeature, TFeatureCollection } from "../../types/feature";
import { FeaturesApi, CommentsApi } from "../../api";
import Dialog from "../../components/Dialog";

import "./styles.css";

function App() {
  const [loadData, setLoadData] = useState<boolean>(false);
  const [features, setFeatures] = useState<TFeature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const [messages, setMessages] = useState<string[]>([]);

  const [mgFilter, setMgFilter] = useState<Set<string>>(new Set());
  const [paginDisplay, setPaginDisplay] = useState<TPagination>({
    current_page: 0,
    total: 0,
    per_page: 0,
  });

  useEffect(() => {
    const abortController = new AbortController();

    getData();

    return () => {
      abortController.abort();
    };
  }, []);

  useEffect(() => {
    if (selectedFeature === null) return;

    const abortController = new AbortController();

    const getComments = async () => {
      const url = CommentsApi.getAllByFeatureId(selectedFeature);

      const data: string[] = await fetch(url, {
        signal: abortController.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Error");
          return res.json();
        })
        .catch((error) => {
          console.log(error);
        });

      if (data) setMessages(data);
    };

    getComments();

    return () => {
      abortController.abort();
    };
  }, [selectedFeature]);

  const getData = async (
    page = paginDisplay.current_page,
    signal?: AbortSignal
  ) => {
    if (loadData) return;
    setLoadData(true);

    const url = FeaturesApi.getAll({
      page: page,
      per_page: 1000,
      mag_type: Array.from(mgFilter),
    });

    const data: TFeatureCollection = await fetch(url, {
      signal,
    })
      .then((res) => res.json())
      .catch((error) => {
        console.log(error);
      });

    setFeatures(data.data);
    setPaginDisplay(data.pagination);

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
            onClick={() => getData()}
          >
            {loadData ? (
              <Icon name="refresh" className="load" />
            ) : (
              <Icon name="search" />
            )}
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
        <VirtualList
          loading={loadData}
          itemData={features}
          itemCount={features.length}
          itemSize={window.innerHeight / 10}
        >
          {({ index, style }) => (
            <CellFeature
              {...features[index]}
              index={index}
              style={style}
              onClick={() => setSelectedFeature(index)}
            />
          )}
        </VirtualList>
      </main>

      <footer>
        <Pagination
          total={paginDisplay.total}
          pageSize={paginDisplay.per_page}
          current={paginDisplay.current_page}
          onChange={(page) => getData(page)}
        />
      </footer>

      <Dialog
        id="feature-comments-dialog"
        title="Comentarios"
        open={selectedFeature !== null}
        onClose={() => setSelectedFeature(null)}
      >
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </Dialog>
    </>
  );
}

export default App;
