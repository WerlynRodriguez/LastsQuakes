interface IIconProps {
  name: string;
  size?: string;
  className?: string;
}

export default function (props: IIconProps) {
  const { name, size, className } = props;
  return <i className={`fi fi-br-${name} ${size} ${className}`}></i>;
}
