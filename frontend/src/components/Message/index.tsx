import "./styles.css";

interface IMessageProps {
  message: string;
  date: string;
}

/**
 * Humanize date with this format: 01/12/24 1:30 PM
 */
function humanizeDate(date: string) {
  const d = new Date(date);
  const options: Intl.DateTimeFormatOptions = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return d.toLocaleDateString("en-US", options);
}

export default function (props: IMessageProps) {
  const { message, date } = props;
  return (
    <div className="message">
      {message}
      <br />
      <span className="date">{humanizeDate(date)}</span>
    </div>
  );
}
