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
import { TComment } from "../../types/comment";
import Message from "../../components/Message";

function App() {
  const [loadData, setLoadData] = useState<boolean>(false);
  const [features, setFeatures] = useState<TFeature[]>([]);
  const [selectedFeature, setSelectedFeature] = useState<number | null>(null);

  const [messages, setMessages] = useState<TComment[]>([]);

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
      const url = CommentsApi.getAllByFeatureId(features[selectedFeature].id);

      const data: TComment[] = await fetch(url, {
        signal: abortController.signal,
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unexpected response");
          return res.json();
        })
        .catch((error) => {
          alert("Error al obtener los comentarios");
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
        alert("Error al obtener los datos");
        return {
          data: [],
          pagination: { current_page: 0, total: 0, per_page: 0 },
        };
      });

    setFeatures(data.data);
    setPaginDisplay(data.pagination);

    setLoadData(false);
  };

  const onHandleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedFeature === null) return;

    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const comment = formData.get("comment") as string;

    if (!comment) { alert("El comentario no puede estar vacío"); return;}
    if (comment.length < 5) { alert("El comentario debe tener al menos 5 caracteres"); return;}
    if (comment.length > 50) { alert("El comentario no puede tener más de 50 caracteres"); return;}

    const url = CommentsApi.postByFeatureId(features[selectedFeature].id);

    const data: TComment = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: comment,
      }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unexpected response");
        return res.json();
      })
      .catch((error) => {
        alert("Error al enviar el comentario");
      });

    if (data) {
      setMessages([...messages, data]);
      form.reset();
    }
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
        onClose={() => {
          setSelectedFeature(null);
          setMessages([]);
        }}
      >
        <ul className="messages">
          {messages.map((message, index) => (
            <Message
              key={index}
              message={message.body}
              date={message.created_at}
            />
          ))}
        </ul>

        <form onSubmit={onHandleSubmit}>
          <div className="join_container">
            <input
              name="comment"
              type="text"
              required
              maxLength={50}
              min={5}
              placeholder="Escribe un comentario"
            />
            <button
              className="primary rounded"
              aria-label="Enviar"
              type="submit"
            >
              <Icon name="paper-plane" />
            </button>
          </div>
        </form>
      </Dialog>
    </>
  );
}

export default App;
