import "./styles.css";

interface IMessageProps {
  message: string;
  date: string;
}

export default function (props: IMessageProps) {
  return (
    <span className="message" data-date={props.date}>
      {props.message}
    </span>
  );
}
