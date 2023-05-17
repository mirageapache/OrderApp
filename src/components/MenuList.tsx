import 'styles/css/menuList.css'
import { menuList } from 'assets/dummyData/menuList.js'
import image from 'assets/images/chesee-egg-cake.jpg'
import {ReactComponent as IconAdd } from 'assets/icons/add.svg'
import { useSetting } from 'context/SettingContext';
import ItemModel from './ItemModel';
import { useState } from 'react';

interface ItemData {
  name: string;
  price: number;
  img: string;
}

export default function MenuList(){
  const { menuMode } = useSetting();
  const [modelState, setModelState] = useState<boolean>(false)

  const item = menuList.map((item: ItemData, index: number)=>{
    return <MenuItem key={index} data={item} modelState={modelState} handleClick={() => setModelState(!modelState)} />
  })

  return(
    <div className="menu-list">
      { modelState && <ItemModel handleClick={() => setModelState(!modelState)}/> }
      <div className={menuMode}>
        {item}
      </div>
    </div>
  )
}

function MenuItem( props:{ data: ItemData; modelState: boolean; handleClick: (value: boolean) => void } ){
  const {data, modelState, handleClick} = props

  return(
    <div className='menu-item'>
      <img className='item-img' src={image} alt="item images" />
      <div className='item-info'>
        <p className='item-name'>{data.name}</p>
        <p className='item-price'>NT. {data.price}</p>
        <IconAdd className='icon add-icon' onClick={() => handleClick(!modelState)} />
      </div>
    </div>
  )
}


