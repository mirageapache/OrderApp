import 'styles/css/itemModel.css'
import { ReactComponent as IconCancel } from 'assets/icons/cancel.svg'
import { ReactComponent as IconAdd } from 'assets/icons/add.svg'
import { ReactComponent as IconMinus } from 'assets/icons/minus.svg'
import { useEffect, useState } from 'react'
import { useSetting } from 'context/SettingContext'
import { apiURL } from 'api'
import axios from 'axios'

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  itemType: string;
  customOption: string;
  imgName: string;
}

export default function ItemModel(){
  const [amount, setAmount] = useState<number>(0);
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>(); // 儲存 item 資料
  const { setModelState, itemId } = useSetting(); // item model控制項目

  useEffect(() => {
    if(menuItem === undefined){
      // 取得特定的餐點資訊
      axios.get(`${apiURL}/menu/${itemId}`)
      .then(res=>{
        console.log(res.data)
        setMenuItem(res.data)
      })
      .catch(error => console.log(error))
    }
  },[itemId,menuItem])

  if (!menuItem) {
    return null; // 如果 menuItem 不存在，可根據需求返回適當的內容或顯示加載狀態
  }

  // 圖片設定
  let imgPath: string = '/OrderApp/images/default_img.jpg';
  if(menuItem.imgName){
    imgPath = `/OrderApp/images/${menuItem.itemType}/${menuItem.imgName}`
  }

  // 客製化選項設定
  const optionArray = menuItem.customOption.split('、');
  const custOption = optionArray.map((item:string, index:number) => {
    return <span className='item-option' key={index}>{item}</span>
  });
  
  return(
    <div className="item-model">
      <div className='gray-panel' onClick={() => setModelState(false)}></div>
      <div className='model-panel'>
        <div className='model-header'>
          <span>
            <h2 className='item-name'>{menuItem.name}</h2>
            <h2 className='item-price'>價格：NT {menuItem.price} 元</h2>
          </span>
          <IconCancel className='icon cancel-icon' onClick={() => setModelState(false)}/>
        </div>
        <div className='model-body'>
          <div className='img-div'>
            <img src={imgPath} alt="item images" />
          </div>
          <p className='item-description'>{menuItem.description}</p>
          <div className='customization'>
            <h2>客製化選項</h2>
            <div className='option-div'>
              {custOption}
            </div>
          </div>
        </div>
        <div className='model-footer'>
          <span className='amount-option'>
            <IconMinus className='icon minus-icon' onClick={() => {amount > 0 && setAmount(amount-1)}}/>
            <h3 className='amount'>{amount}</h3>
            <IconAdd className='icon add-icon' onClick={() => setAmount(amount+1)}/>
            <button className='btn add-cart'>加入購物車</button>
          </span>
        </div>
      </div>
    </div>
  )
}