import Icon from "../Icon";
import "./styles.css";

interface IPaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (page: number) => void;
}

export default function (props: IPaginationProps) {
  const { total, pageSize, current, onChange } = props;
  const pages = Math.ceil(total / pageSize);

  return (
    <div className="pagination">
      <button
        className="ghost"
        disabled={current <= 1}
        onClick={() => onChange(current - 1)}
      >
        <Icon name="angle-left" />
        Anterior
      </button>

      <span>
        Página {current} de {pages}
      </span>

      <button
        className="ghost"
        disabled={current >= pages}
        onClick={() => onChange(current + 1)}
      >
        Siguiente
        <Icon name="angle-right" />
      </button>
    </div>
  );
}
