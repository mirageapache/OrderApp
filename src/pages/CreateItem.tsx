import axios from "axios";
import Header from "components/Header/Header";
import { useEffect, useRef, useState } from "react";
import "styles/createItem.scss";
import { apiURL } from "api";
import Notification from "components/App/Notification";
import { useNoti } from "context/NotiContext";

interface ErrorMsg {
  title: string;
  msg: string;
}

export default function CreateItem() {
  // 資料驗證時判斷是否有錯誤
  let defaultErrMsg = { title: "", msg: "" }; // 錯誤訊息預設格式
  const [errorMsg, setErrorMsg] = useState<ErrorMsg>(defaultErrMsg);
  // input資料變數
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string | number>(20);
  const [itemType, setItemType] = useState<string>("meals");
  const [customOption, setCustomOption] = useState<string>("");
  const [imgName, setimgName] = useState<string>("");
  //  input元素
  const nameRef = useRef<HTMLInputElement>(null!);
  const desRef = useRef<HTMLTextAreaElement>(null!);
  // paragraph元素
  const nameMsgRef = useRef<HTMLParagraphElement>(null!);
  const desMsgRef = useRef<HTMLParagraphElement>(null!);
  // Noti提示訊息框
  const { is_alert, setIsAlert, setNotiMessage } = useNoti();

  useEffect(() => {
    let nameInput = nameRef.current;
    let desInput = desRef.current;
    let nameMsg = nameMsgRef.current;
    let desMsg = desMsgRef.current;
    if (errorMsg.title.length > 0) {
      // something error
      if (errorMsg.title === "name") {
        nameMsg.textContent = errorMsg.msg;
        nameMsg.className = "err-msg msg-show";
        nameInput?.focus();
        nameInput.className = "form-input input-show";
      } else if (errorMsg.title === "description") {
        desMsg.textContent = errorMsg.msg;
        desMsg.className = "err-msg msg-show";
        desInput.focus();
        desInput.className = "form-input input-show";
      }
    } else {
      nameMsg.className = "err-msg";
      nameInput.className = "form-input";
      desMsg.className = "err-msg";
      desInput.className = "form-input";
    }
  }, [errorMsg, errorMsg.title, errorMsg.msg]);

  // Name 輸入資料驗證
  function checkNameInput(value: string): void {
    if (value.length > 50) {
      setErrorMsg({ title: "name", msg: "字數上限為50字" });
      value = value.substring(0, 50);
    } else {
      setErrorMsg(defaultErrMsg);
    }
    setName(value);
  }

  // Description 輸入資料驗證
  function checkDesTextarea(value: string): void {
    if (value.length > 150) {
      setErrorMsg({ title: "description", msg: "字數上限為150字" });
      value = value.substring(0, 150);
    } else {
      setErrorMsg(defaultErrMsg);
    }
    setDescription(value);
  }

  // Create Menu Item 新增餐點項目
  function handleCreate(): void {
    setErrorMsg(defaultErrMsg);
    // data validation
    if (name.length === 0) {
      setErrorMsg({ title: "name", msg: "餐點名稱必填" });
    } else if (description.length === 0) {
      setErrorMsg({ title: "description", msg: "餐點說明必填" });
    } else {
      // data validation success
      axios
        .post(`${apiURL}/menu/create`, {
          name,
          description,
          price,
          itemType,
          customOption,
          imgName,
        })
        .then((result) => {
          // call API success
          setNotiMessage({ type: "success", message: "新增成功！" });
          setIsAlert(true);
          setName("");
          setDescription("");
          setPrice(20);
          setItemType("meals");
          setCustomOption("");
          setimgName("");
        })
        .catch((error) => {
          // call API failed
          console.log(error);
          const status_code = error.response.status;
          const err_msg = error.response.data;
          if (status_code === 400) {
            if (err_msg === "name is require") {
              setErrorMsg({ title: "name", msg: "餐點名稱必填" });
              setNotiMessage({ type: "error", message: "餐點名稱必填" });
            } else if (
              err_msg === "name maximum number of characters is over 50"
            ) {
              setErrorMsg({ title: "name", msg: "字數上限為50字" });
              setNotiMessage({ type: "error", message: "字數上限為50字" });
            } else if (err_msg === "description is require") {
              setErrorMsg({ title: "description", msg: "餐點說明必填" });
              setNotiMessage({ type: "error", message: "餐點說明必填" });
            } else if (
              err_msg === "description maximum number of characters is over 150"
            ) {
              setErrorMsg({ title: "description", msg: "字數上限為150字" });
              setNotiMessage({ type: "error", message: "字數上限為150字" });
            }
          } else if (status_code === 500) {
            setNotiMessage({
              type: "error",
              message: "與伺服器連線有異常！請稍候再試！",
            });
          }
          setIsAlert(true);
        });
    }
  }

  return (
    <div id="create-item" className="create-item">
      <Header />
      <h2 className="page-title">新增餐點</h2>
      <div className="create-form">
        {/* 餐點名稱 */}
        <label className="form-label" htmlFor="item-name">
          *餐點名稱
          <p className="err-msg" ref={nameMsgRef}>
            錯誤訊息!
          </p>
        </label>
        <input
          id="item-name"
          ref={nameRef}
          className="form-input"
          type="text"
          maxLength={50}
          placeholder="餐點名稱..."
          value={name}
          onChange={(e) => {
            checkNameInput(e.target.value);
          }}
        />
        {/* 餐點說明 */}
        <label className="form-label" htmlFor="item-description">
          *餐點說明
          <p className="err-msg" ref={desMsgRef}>
            錯誤訊息!
          </p>
        </label>
        <textarea
          id="item-description"
          ref={desRef}
          className="form-input"
          cols={30}
          rows={3}
          maxLength={150}
          placeholder="敘述這個餐點的特色..."
          value={description}
          onChange={(e) => {
            checkDesTextarea(e.target.value);
          }}
        ></textarea>

        <div className="fold-div">
          <div>
            {/* 價格 */}
            <label className="form-label" htmlFor="item-price">
              價格
            </label>
            <input
              id="item-price"
              className="form-input"
              type="number"
              placeholder="餐點訂價"
              min={0}
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div>
            {/* 餐點類別 */}
            <label className="form-label" htmlFor="item-type">
              餐點類別
            </label>
            <select
              name=""
              id="item-type"
              className="form-input"
              defaultValue={itemType}
              onChange={(e) => {
                setItemType(e.target.value);
              }}
            >
              <option value="meals">活力套餐 - meals</option>
              <option value="burgers">滿足漢堡 - burgers</option>
              <option value="toasts">現烤吐司 - toasts</option>
              <option value="eggcakes">經典蛋餅 - eggcakes</option>
              <option value="snacks">點心小品 - snacks</option>
              <option value="drinks">飲料 - drinks</option>
            </select>
          </div>
        </div>

        {/* 客製選項 */}
        <label className="form-label" htmlFor="custom-option">
          客製選項
        </label>
        <input
          id="custom-option"
          className="form-input"
          type="text"
          placeholder="加辣、加醬…"
          value={customOption}
          onChange={(e) => {
            setCustomOption(e.target.value);
          }}
        />
        {/* 圖片路徑 */}
        <label className="form-label" htmlFor="item-img">
          圖片名稱
        </label>
        <input
          id="item-img"
          className="form-input"
          type="text"
          placeholder="default_img.jpg"
          value={imgName}
          onChange={(e) => {
            setimgName(e.target.value);
          }}
        />

        <div className="action-div">
          <button className="btn create-btn" onClick={handleCreate}>
            新增
          </button>
        </div>
      </div>

      {/* 通知訊息*/}
      {is_alert && <Notification />}
    </div>
  );
}
