import 'styles/css/menuList.css'
import { menuList } from 'assets/dummyData/menuList.js'
import image from 'assets/images/chesee-egg-cake.jpg'
import {ReactComponent as IconAdd } from 'assets/icons/add.svg'

interface ItemData {
  name: string;
  price: number;
  img: string;
}

export default function MenuList(){

  const item = menuList.map((item: ItemData, index: number)=>{
    return <MenuItem key={index} data={item} />
  })

  return(
    <div className="menu-list">
      <div className='list-mode'>
        {item}
      </div>
    </div>
  )
}

function MenuItem( props:{ data: ItemData } ){
  const {data} = props

  return(
    <div className='menu-item'>
      <img className='item-img' src={image} alt="item images" />
      <div className='item-info'>
        <p className='item-name'>{data.name}</p>
        <p className='item-price'>NT. {data.price}</p>
        <IconAdd className='icon add-icon' />
      </div>
    </div>
  )
}


