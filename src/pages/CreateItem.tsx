import Header from "components/Header"
import { useState } from "react"
import 'styles/css/createItem.css'

export default function CreateItem(){
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [price, setPrice] = useState<string|number>(20)
  const [itemType, setItemType] = useState<string>('meals')
  const [option, setOption] = useState<string>('')
  const [imgPath, setImgPath] = useState<string>('default_img.jpg')

  return(
    <div id="create-item" className="create-item">
      <Header />
      <h2 className="page-title">新增餐點</h2>
      <form className="create-form" action="post">
      {/* 餐點名稱 */}
        <label className="form-label" htmlFor="item-name">餐點名稱</label>
        <input id="item-name" className="form-input" type="text" placeholder="餐點名稱..." value={name} onChange={(e)=>{setName(e.target.value)}} />
      {/* 餐點說明 */}
        <label className="form-label" htmlFor="item-description">餐點說明</label>
        <textarea id="item-description" className="form-input" cols={30} rows={3} placeholder="敘述這個餐點的特色..." value={description} onChange={(e)=>{setDescription(e.target.value)}} ></textarea>

        <div className="fold-div">
          <div>
            {/* 價格 */}
            <label className="form-label" htmlFor="item-price">價格</label>
            <input id="item-price" className="form-input" type='number' placeholder="餐點訂價" value={price} onChange={(e)=>{setPrice(e.target.value)}} />

          </div>
          <div>

            {/* 餐點類別 */}
              <label className="form-label" htmlFor="item-type">餐點類別</label>
              <select name="" id="item-type" className="form-input" defaultValue={itemType}  onChange={(e)=>{setItemType(e.target.value)}} >
                <option value="meals" >活力套餐 - meals</option>
                <option value="burgers">滿足漢堡 - burgers</option>
                <option value="toasts">現烤吐司 - toasts</option>
                <option value="egg-cakes">經典蛋餅 - egg-cakes</option>
                <option value="snacks">點心小品 - snacks</option>
                <option value="drinks">飲料 - drinks</option>
              </select>
          </div>
        </div>

      {/* 客製選項 */}
        <label className="form-label" htmlFor="custom-option">客製選項</label>
        <input id="custom-option" className="form-input" type="text" placeholder="加辣、加醬…" value={option} onChange={(e)=>{setOption(e.target.value)}} />
      {/* 圖片路徑 */}
        <label className="form-label" htmlFor="item-">圖片名稱</label>
        <input id="item-" className="form-input" type="text" placeholder="imgae.jpg" value={imgPath} onChange={(e)=>{setImgPath(e.target.value)}} />

        <div className="action-div">
          <button className="btn create-btn">新增</button>
        </div>
      </form>
    </div>
  )
}