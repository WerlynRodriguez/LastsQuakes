import { useEffect, useState } from "react";
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

function App() {
  const [loadData, setLoadData] = useState<boolean>(false);
  const [features, setFeatures] = useState<TFeature[]>([]);

  const [mgFilter, setMgFilter] = useState<Set<string>>(new Set());
  const [paginOptions, setPaginOptions] = useState<TPagination>({
    current_page: 1,
    total: 0,
    per_page: 0,
  });

  useEffect(() => {
    const controller = new AbortController();

    getData(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  const getData = async (signal: AbortSignal) => {
    if (loadData) return;
    setLoadData(true);

    const data: TFeatureCollection = {
      data: [
        {
          id: 1,
          type: "feature",
          attributes: {
            external_id: "nc74032026",
            magnitude: "0.95",
            place: "2 km NE of The Geysers, CA",
            time: "2024-04-09 20:57:01 -0600",
            tsunami: false,
            mag_type: "md",
            title: "M 1.0 - 2 km NE of The Geysers, CA",
            coordinates: {
              longitude: "-122.7350006",
              latitude: "38.791832",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/nc74032026",
          },
        },
        {
          id: 2,
          type: "feature",
          attributes: {
            external_id: "nn00875987",
            magnitude: "2.3",
            place: "41 km NE of Herlong, California",
            time: "2024-04-09 20:53:51 -0600",
            tsunami: false,
            mag_type: "ml",
            title: "M 2.3 - 41 km NE of Herlong, California",
            coordinates: {
              longitude: "-119.8169",
              latitude: "40.4309",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/nn00875987",
          },
        },
        {
          id: 3,
          type: "feature",
          attributes: {
            external_id: "nn00875984",
            magnitude: "2.4",
            place: "38 km NE of Herlong, California",
            time: "2024-04-09 20:48:43 -0600",
            tsunami: false,
            mag_type: "ml",
            title: "M 2.4 - 38 km NE of Herlong, California",
            coordinates: {
              longitude: "-119.7865",
              latitude: "40.3637",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/nn00875984",
          },
        },
        {
          id: 4,
          type: "feature",
          attributes: {
            external_id: "ci40709264",
            magnitude: "0.75",
            place: "7 km WSW of Anza, CA",
            time: "2024-04-09 20:43:53 -0600",
            tsunami: false,
            mag_type: "ml",
            title: "M 0.8 - 7 km WSW of Anza, CA",
            coordinates: {
              longitude: "-116.7405",
              latitude: "33.521",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/ci40709264",
          },
        },
        {
          id: 5,
          type: "feature",
          attributes: {
            external_id: "nc74032006",
            magnitude: "1.42",
            place: "7 km NNE of Cambria, CA",
            time: "2024-04-09 20:32:35 -0600",
            tsunami: false,
            mag_type: "md",
            title: "M 1.4 - 7 km NNE of Cambria, CA",
            coordinates: {
              longitude: "-121.0468369",
              latitude: "35.6208344",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/nc74032006",
          },
        },
        {
          id: 6,
          type: "feature",
          attributes: {
            external_id: "pr71445298",
            magnitude: "3.07",
            place: "13 km N of San Antonio, Puerto Rico",
            time: "2024-04-09 20:16:37 -0600",
            tsunami: false,
            mag_type: "md",
            title: "M 3.1 - 13 km N of San Antonio, Puerto Rico",
            coordinates: {
              longitude: "-67.1131666666667",
              latitude: "18.6146666666667",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/pr71445298",
          },
        },
        {
          id: 7,
          type: "feature",
          attributes: {
            external_id: "us7000mb4g",
            magnitude: "1.4",
            place: "4 km NE of Whitehouse Station, New Jersey",
            time: "2024-04-09 20:11:33 -0600",
            tsunami: false,
            mag_type: "ml",
            title: "M 1.4 - 4 km NE of Whitehouse Station, New Jersey",
            coordinates: {
              longitude: "-74.7266",
              latitude: "40.6395",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/us7000mb4g",
          },
        },
        {
          id: 8,
          type: "feature",
          attributes: {
            external_id: "us7000mb3x",
            magnitude: "4.9",
            place: "84 km SSW of Unalaska, Alaska",
            time: "2024-04-09 19:55:14 -0600",
            tsunami: false,
            mag_type: "mb",
            title: "M 4.9 - 84 km SSW of Unalaska, Alaska",
            coordinates: {
              longitude: "-166.8528",
              latitude: "53.143",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/us7000mb3x",
          },
        },
        {
          id: 9,
          type: "feature",
          attributes: {
            external_id: "ci40709256",
            magnitude: "1.87",
            place: "13 km W of Port Hueneme, CA",
            time: "2024-04-09 19:44:30 -0600",
            tsunami: false,
            mag_type: "ml",
            title: "M 1.9 - 13 km W of Port Hueneme, CA",
            coordinates: {
              longitude: "-119.3335",
              latitude: "34.1401667",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/ci40709256",
          },
        },
        {
          id: 10,
          type: "feature",
          attributes: {
            external_id: "nc74031996",
            magnitude: "0.75",
            place: "7 km NW of The Geysers, CA",
            time: "2024-04-09 19:40:48 -0600",
            tsunami: false,
            mag_type: "md",
            title: "M 0.8 - 7 km NW of The Geysers, CA",
            coordinates: {
              longitude: "-122.8193359",
              latitude: "38.8115005",
            },
          },
          links: {
            external_url:
              "https://earthquake.usgs.gov/earthquakes/eventpage/nc74031996",
          },
        },
      ],
      pagination: {
        current_page: 1,
        total: 10,
        per_page: 10,
      },
    };

    setFeatures(data.data);
    setPaginOptions(data.pagination);
  };

  return (
    <>
      <header>
        <div className="join_container">
          <input type="search" placeholder="Ej: Cambria, CA" />

          <button className="primary rounded" aria-label="Buscar">
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
          onChange={(page) => setPaginOptions({ ...paginOptions, current_page: page })}
        />
      </footer>
    </>
  );
}

export default App;
