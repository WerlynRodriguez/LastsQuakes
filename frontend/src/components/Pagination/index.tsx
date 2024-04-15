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

  return (
    <div className="pagination">
      <button disabled={current <= 1} onClick={() => onChange(current - 1)}>
        <Icon name="angle-left" />
        Anterior
      </button>

      <span>
        Página {current} de {Math.ceil(total / pageSize)}
      </span>

      <button
        disabled={current >= Math.ceil(total / pageSize)}
        onClick={() => onChange(current + 1)}
      >
        Siguiente
        <Icon name="angle-right" />
      </button>
    </div>
  );
}
