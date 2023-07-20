import "styles/menuList.scss";
import axios from "axios";
import { useSetting } from "context/SettingContext";
import { useEffect, useState } from "react";
import { apiURL } from "api";

// SVG檔
import { ReactComponent as IconAdd } from "assets/icons/add.svg";

interface ItemData {
  _id: string;
  name: string;
  description: string;
  price: number;
  itemType: string;
  customOption: string;
  imgName: string;
}

export default function MenuList() {
  const { menuMode } = useSetting(); // menu顯示模式
  const { modelState, setModelState, setItemId } = useSetting(); // item model控制項目
  const [menuList, setMenuList] = useState<any>([]); // 儲存menuList資料

  useEffect(() => {
    if (menuList.length === 0) {
      axios
        .get(`${apiURL}/menu`)
        .then((res) => {
          setMenuList(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [menuList]);

  const item = menuList.map((item: ItemData, index: number) => {
    return (
      <MenuItem
        key={index}
        data={item}
        modelState={modelState}
        handleClick={() => {
          setModelState(!modelState);
          setItemId(item._id);
        }}
      />
    );
  });

  return (
    <section className="menu-list">
      <div className={menuMode}>{item}</div>
    </section>
  );
}

function MenuItem(props: {
  data: ItemData;
  modelState: boolean;
  handleClick: (value: boolean) => void;
}) {
  const { data, modelState, handleClick } = props;
  let imgPath: string = "/OrderApp/images/default_img.jpg";
  if (data.imgName) {
    imgPath = `/OrderApp/images/${data.itemType}/${data.imgName}`;
  }

  return (
    <div className="menu-item">
      <img className="item-img" src={imgPath} alt="images" />
      <div className="item-info">
        <p className="item-name">{data.name}</p>
        <p className="item-price">NT. {data.price}</p>
        <IconAdd
          className="icon add-icon"
          onClick={() => handleClick(!modelState)}
        />
      </div>
    </div>
  );
}
