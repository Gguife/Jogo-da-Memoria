import { useEffect, useState } from 'react';
import { InfoItem } from './components/infoItem/Info';

import { Button } from './components/Button/button';
import { GridItem } from './components/GridItem/grid';

import { GridItemTypes } from './types/GridItemTypes';
import { items } from './data/items';
import { formatTimeElapsed } from './helpers/formatTimeElapsed';

import logoMemory from './svgs/memory.png';
import restartIcon from './svgs/restart.svg'

import './App.css';



const App = () => {
  const [playing, setPlaying] = useState<boolean>();
  const [timeElapsed, setTimeElipse] = useState<number>(0);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [shownCount, setShownCount] = useState<number>(0);
  const [gridItems, setGridItems] = useState<GridItemTypes[]>([]);
  
  useEffect(()=> resetCreateGrid(), [])
  useEffect(() => {
    const time = setInterval(()=>{
      if(playing) {
      setTimeElipse(timeElapsed + 1);
      }
    }, 1000);
    return () => clearInterval(time);
  }, [playing, timeElapsed]);

  //verify if opened are equal
  useEffect (() => {
    if(shownCount === 2){
      let opened = gridItems.filter(item => item.shown === true)
      if(opened.length === 2){
        
        if(opened[0].item === opened[1].item){
          let tmpGrid = [...gridItems];
          for(let i in tmpGrid){
            if(tmpGrid[i].shown){
              tmpGrid[i].permanentShown = true;
              tmpGrid[i].shown = false; 
            }
          }
          setGridItems(tmpGrid);
          setShownCount(0);
        }else{
          setTimeout(()=>{
            let tmpGrid = [...gridItems];
            for(let i in tmpGrid){
              tmpGrid[i].shown = false;
            }
            setGridItems(tmpGrid);
            setShownCount(0);
          },1000)
        }
        setMoveCount(moveCount => moveCount +1);
      }
    }
  }, [shownCount, gridItems]);

  //verify if game is over
  useEffect(()=>{
    if(moveCount > 0 && gridItems.every(item => item.permanentShown === true))
      setPlaying(false);
  },[moveCount, gridItems]);


  const resetCreateGrid = () =>{
    //Reset play
    setTimeElipse(0);
    setShownCount(0);
    setMoveCount(0);
    
    //Create grid
    let tmpGrid: GridItemTypes[] = [];
    for(let i = 0; i < (items.length * 2); i++){
      tmpGrid.push({
        item: null, shown: false, permanentShown: false
      });
    }

    //grid loop
    for(let w = 0; w < 2; w++){
      for(let j = 0; j < items.length; j++){
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !== null){
          pos = Math.floor(Math.random() * (items.length * 2));
        }
        tmpGrid[pos].item = j;
      }
    }

    //state
    setGridItems(tmpGrid);

    //Start play
    setPlaying(true);
  }

  const handleItemClick = (index:number) => {
    if(playing && index !==null && shownCount < 2){
      let tmpGrid = [...gridItems];
      if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false){
        tmpGrid[index].shown = true;
        setShownCount(shownCount + 1)
      }
      setGridItems(tmpGrid);
    }
  }

  return (
    <div className="container">
      <div className="info">
        <div className="logo-link">
          <a href="https://github.com/Gguife"><img src={logoMemory} width='100px' alt="" /></a>
          <p>Guilherme Gomes</p>
        </div>
        <div className="info-area">
          <InfoItem label='Tempo' value={formatTimeElapsed(timeElapsed)} />
          <InfoItem label='Movimentos' value={moveCount.toString()} />
        </div>
        <Button label='Reiniciar' icon={restartIcon} onclick={resetCreateGrid}/>
      </div>
      <div className="grid-area">
        <div className="grid">
          {gridItems.map((item, index)=>(
            <GridItem
              key={index}
              item={item}
              onClick={() => handleItemClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App