import './infostyle.css';

type Props = {
  label: string;
  value: string;
}

export const InfoItem = ({label, value}: Props) => {
  return (
    <div className="container-info-area">
      <div className="label">{label}</div>
      <div className="value">{value}</div>
    </div>
  );
}

