import Header from 'components/Header';
import ContentBody from 'components/ContentBody';
import ToolBanner from 'components/ToolBanner';


export default function MainPage(){
  return(
    <div id='main-page' className='main-page'>
      <Header />
      <ToolBanner />
      <ContentBody />
    
    </div>
  )
}