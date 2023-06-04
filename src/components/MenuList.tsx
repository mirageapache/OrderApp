import 'styles/css/menuList.css'
import axios from 'axios';
import { useSetting } from 'context/SettingContext';
import ItemModel from './ItemModel';
import { useEffect, useState } from 'react';
import { apiURL } from 'api';

// SVG檔
import {ReactComponent as IconAdd } from 'assets/icons/add.svg'

interface ItemData {
  name: string;
  description: string;
  price: number;
  itemType: string;
  customOption: string;
  imgName: string;
}

export default function MenuList(){
  const { menuMode } = useSetting();
  const [modelState, setModelState] = useState<boolean>(false);
  const [menuList, setMenuList] = useState<any>([]);

  useEffect(() => {
    if(menuList.length === 0){
      axios.get(`${apiURL}/menu`)
      .then(res => {
        setMenuList(res.data);
      })
      .catch(error => console.log(error))
    }
  },[menuList])

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
  const {data, modelState, handleClick} = props;
  let imgPath: string = '/OrderApp/images/default_img.jpg';
  if(data.imgName){
    imgPath = `/OrderApp/images/${data.itemType}/${data.imgName}`
  }

  return(
    <div className='menu-item'>
      <img className='item-img' src={imgPath} alt="images" />
      <div className='item-info'>
        <p className='item-name'>{data.name}</p>
        <p className='item-price'>NT. {data.price}</p>
        <IconAdd className='icon add-icon' onClick={() => handleClick(!modelState)} />
      </div>
    </div>
  )
}


