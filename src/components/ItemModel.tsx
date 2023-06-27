import 'styles/css/itemModel.css'
import { ReactComponent as IconCancel } from 'assets/icons/cancel.svg'
import { ReactComponent as IconAdd } from 'assets/icons/add.svg'
import { ReactComponent as IconMinus } from 'assets/icons/minus.svg'
import { useEffect, useState } from 'react'
import { useSetting } from 'context/SettingContext'
import { useCart } from 'context/CartContext'
import { apiURL } from 'api'
import axios from 'axios'

// 從api取回資料的custOption型別(用於頁面顯示用的)
interface CustOption {
  type: string;
  category: string;
  item: [string];
}

// 購物車設定的custOption型別(加入購物車時用的)
interface CartCustOption {
  item: string;
  index: number;
  active: boolean;
}

// 餐點資料的型別
interface MenuItem {
  _id: string;
  name: string;
  description: string;
  price: number;
  itemType: string;
  customOption: CustOption;
  imgName: string;
}

export default function ItemModel(){
  const [amount, setAmount] = useState<number>(0);
  const [menuItem, setMenuItem] = useState<MenuItem | undefined>(); // 儲存 item 資料
  const [custOption, setCustOption] = useState<CartCustOption[]>() // 儲存 custOption 已選擇的客製化項目
  const { setModelState, itemId } = useSetting(); // item model控制項目
  const { setCartItem, setCartInfo} = useCart(); //購物車控制項

  useEffect(() => {
    if(menuItem === undefined){
      // 取得特定的餐點資訊
      axios.get(`${apiURL}/menu/${itemId}`)
      .then(res=>{
        setMenuItem(res.data)
      })
      .catch(error => console.log(error))
    }
  },[itemId,menuItem])
  if (!menuItem) {
    return null; // 如果 menuItem 不存在，可根據需求返回適當的內容或顯示加載狀態
  }

  // 設定客製選項
  function setOption(item: string, optionType: string, index: number){
    if(optionType === 'single'){ // 單選
      if(custOption !== undefined && custOption.length > 0){
        //在有資料的狀況下判斷是不是點擊同一個選項
        if(custOption[0].index === index && custOption[0].active === true){
          setCustOption([]) // 點擊相同選項則刪除
        }
        else {
          setCustOption([{item, index, active:true}]) // 不同選項則修改
        }
      }
      else{
        setCustOption([{item, index, active:true}]) // 沒有資料，直接新增選項
      }
    }
    else{ // 複選
      if(custOption !== undefined && custOption.length > 0){
        //不是undefined 表示有資料
        let temp_otpion;
        let cancel_item = custOption.find(item => item.index === index) //判斷是不是點擊同一個選項
        if( cancel_item !== undefined){ // 不是undefined表示點擊相同的選項
          temp_otpion = custOption.filter(item => item.index !== index);
          setCustOption(temp_otpion)
        }
        else{
          setCustOption((prevItem:any) => {
            return [
              ...prevItem,
              {item, index, active: true}
            ]
          })
        } 
      }
      else{
        setCustOption([{item,index, active: true}]) // 沒有資料，直接新增選項
      }
    }
  }

  // 加入購物車
  function addCartItem (){
    if(amount > 0){
      console.log(amount)

      setCartItem((prevItem:any) => {
        return [
          ...prevItem,
          {
            id: itemId,
            name:menuItem?.name,
            price:menuItem?.price,
            amount: amount,
            custOption: custOption
          }
        ];
      });


      // let info = {
      //   'total': 0
      // }
    }
  }

  // 圖片設定
  let imgPath: string = '/OrderApp/images/default_img.jpg';
  if(menuItem.imgName){
    imgPath = `/OrderApp/images/${menuItem.itemType}/${menuItem.imgName}`
  }

  // 呈現客製化選項按鈕
  let optionArray = menuItem.customOption;
  let optionList = [];
  optionList = optionArray.item.map((item:string, index:number) => {
    let span_class:string = 'item-option';
    if(custOption !== undefined){
      for(let i=0; i<custOption?.length;i++){
        if(custOption[i].index === index){
          span_class = 'item-option-active';
        }
      }
    }
      return <span className={span_class} key={index} onClick={() => setOption(item, optionArray.type, index)}>{item}</span>
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
              {optionList}
            </div>
          </div>
        </div>
        <div className='model-footer'>
          <span className='amount-option'>
            <IconMinus className='icon minus-icon' onClick={() => {amount > 0 && setAmount(amount-1)}}/>
            <h3 className='amount'>{amount}</h3>
            <IconAdd className='icon add-icon' onClick={() => setAmount(amount+1)}/>
            <button className='btn add-cart' onClick={addCartItem}>加入購物車</button>
          </span>
        </div>
      </div>
    </div>
  )
}