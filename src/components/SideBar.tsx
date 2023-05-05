
import 'styles/css/sideBar.css'
import { sideList } from 'assets/dummyData/sidebar.js';
import { useState } from 'react';

export default function SideBar(){

  const [activeItem, setActiveItem] = useState<number>(0);

  const sideBarItem = sideList.map((item, index) => {
    let itemStyle: string = 'sidebar-item'; 
    if(activeItem === index){
      itemStyle = 'sidebar-item active-item';
    }
    return <li className={itemStyle} key={index} onClick={()=>{setActiveItem(index)}}>{item}</li>
  })

  return(
    <div className="sidebar">
      <ul className='sidebar-list'>
        {sideBarItem}
      </ul>
    </div>
  )
}