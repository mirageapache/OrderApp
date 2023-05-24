import 'styles/css/itemModel.css'
import { ReactComponent as IconCancel } from 'assets/icons/cancel.svg'
import { ReactComponent as IconAdd } from 'assets/icons/add.svg'
import { ReactComponent as IconMinus } from 'assets/icons/minus.svg'
import image from 'assets/images/chesee-egg-cake.jpg'
import { useState } from 'react'

export default function ItemModel(props:{ handleClick: (value: boolean) => void }){
  const { handleClick } = props;
  const [amount, setAmount] = useState<number>(0)

  return(
    <div className="item-model">
      <div className='gray-panel' onClick={() => handleClick(false)}></div>
      <div className='model-panel'>
        <div className='model-header'>
          <h2 className='item-name'>起司蛋餅</h2>
          <IconCancel className='icon cancel-icon' onClick={() => handleClick(false)}/>
        </div>
        <div className='model-body'>
          <div className='img-div'>
            <img src={image} alt="item images" />
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
            <h2>價格：NT 30 元</h2>
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