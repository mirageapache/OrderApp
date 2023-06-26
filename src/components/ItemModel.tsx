import 'styles/css/itemModel.css'
import { ReactComponent as IconCancel } from 'assets/icons/cancel.svg'
import { ReactComponent as IconAdd } from 'assets/icons/add.svg'
import { ReactComponent as IconMinus } from 'assets/icons/minus.svg'
import { useEffect, useState } from 'react'
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

export default function ItemModel(props:{modelId: string, handleClick: (value: boolean) => void }){
  const { modelId, handleClick } = props;
  const [amount, setAmount] = useState<number>(0);
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>();

  useEffect(() => {
    if(menuItem === undefined){
      // 取得特定的餐點資訊
      axios.get(`${apiURL}/menu/${modelId}`)
      .then(res=>{
        console.log(res.data)
        setMenuItem(res.data)
      })
      .catch(error => console.log(error))
    }
  },[modelId,menuItem])

  if (!menuItem) {
    return null; // 如果 menuItem 不存在，可根據需求返回適當的內容或顯示加載狀態
  }

  let imgPath: string = '/OrderApp/images/default_img.jpg';
  if(menuItem.imgName){
    imgPath = `/OrderApp/images/${menuItem.itemType}/${menuItem.imgName}`
  }

  return(
    <div className="item-model">
      <div className='gray-panel' onClick={() => handleClick(false)}></div>
      <div className='model-panel'>
        <div className='model-header'>
          <h2 className='item-name'>{menuItem.name}</h2>
          <IconCancel className='icon cancel-icon' onClick={() => handleClick(false)}/>
        </div>
        <div className='model-body'>
          <div className='img-div'>
            <img src={imgPath} alt="item images" />
          </div>
          <div className='customization'>
            <h2>客製化選項</h2>
            <div className='option-div'>
              <span>不加醬</span>
              <span>少醬</span>
              <span>加辣</span>
            </div>
          </div>

        </div>
        <div className='model-footer'>
          <span className='show-price'>
            <h2>價格：NT {menuItem.price} 元</h2>
          </span>
          <span className='amount-option'>
            <IconMinus className='icon minus-icon' onClick={() => setAmount(amount-1)}/>
            <p className='amount'>{amount}</p>
            <IconAdd className='icon add-icon' onClick={() => setAmount(amount+1)}/>
            <button className='btn add-cart'>加入購物車</button>
          </span>
        </div>
      </div>
    </div>
  )
}