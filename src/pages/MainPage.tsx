import Header from "components/Header/Header";
import ContentBody from "components/MainContent/ContentBody";
import ToolBanner from "components/Header/ToolBanner";
import ItemModel from "components/MainContent/ItemModel";
import { useSetting } from "context/SettingContext";
import Notification from "components/App/Notification";
import { useNoti } from "context/NotiContext";

export default function MainPage() {
  const { modelState } = useSetting(); // item model 開啟/關閉狀態
  const { is_alert } = useNoti();

  return (
    <div id="main-page" className="main-page">
      <Header />
      <ToolBanner />
      <ContentBody />

      {/* Item Model 彈跳式視窗 */}
      {modelState && <ItemModel />}

      {/* 通知訊息*/}
      {is_alert && <Notification />}
    </div>
  );
}
