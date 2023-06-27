import Header from 'components/Header';
import ContentBody from 'components/ContentBody';
import ToolBanner from 'components/ToolBanner';
import ItemModel from 'components/ItemModel';
import { useSetting } from 'context/SettingContext';


export default function MainPage(){
  const { modelState } = useSetting(); // item model 開啟/關閉狀態

  return(
    <div id='main-page' className='main-page'>
      <Header />
      <ToolBanner />
      <ContentBody />

      {/* Item Model 彈跳式視窗 */}
      { modelState && <ItemModel /> }
    </div>
  )
}