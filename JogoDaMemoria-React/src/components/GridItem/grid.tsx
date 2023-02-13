import { GridItemTypes } from '../../types/GridItemTypes';
import { items } from '../../data/items';
import './grid.css';
import b7Svg from '../../svgs/jogodamemoria.png';

type Props = {
  item: GridItemTypes,
  onClick: () => void
}

export const GridItem = ({item, onClick }: Props) => {
  return (
    <div className='container-grid' onClick={onClick}>
      {item.permanentShown === false && item.shown === false &&
        <div className="grid-icon">
          <img src={b7Svg} alt=""/>
        </div>
      }
      {(item.permanentShown || item.shown) && item.item !== null &&
        <div className="grid-icon-img">
          <img src={items[item.item].icon} alt="" />
        </div>
      }
    </div>
  )
}

