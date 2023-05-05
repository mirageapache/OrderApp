import SideBar from './SideBar'
import MenuList from './MenuList'
import 'styles/css/contentBody.css'

export default function ContentBody(){
  return(
    <div className='content-body'>
      {/* Side Bar */}
      <div className='side-bar'>
        <SideBar />
      </div>

      {/* Main Content */}
      <div className='main-content'>
        <MenuList />
      </div>
    </div>
  )
}