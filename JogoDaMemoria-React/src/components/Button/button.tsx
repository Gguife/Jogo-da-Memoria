import './styleButton.css'
type Props = {
  label: string;
  icon: any;
  onclick: React.MouseEventHandler<HTMLDivElement>;
}
export const Button= ({label, icon, onclick}: Props) => {
  return (
    <div className='button-info' onClick={onclick}>
      <div className="icon-area">
        <img src={icon} alt="" />
      </div>
      <button>{label}</button>
    </div>
  )
}
