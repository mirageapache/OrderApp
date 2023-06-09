import SideBar from './SideBar'
import MenuList from './MenuList'
import 'styles/css/contentBody.css'

export default function ContentBody(){
  return(
    <section className='content-body'>
      {/* Side Bar */}
      <aside className='side-bar'>
        <SideBar />
      </aside>

      {/* Main Content */}
      <main className='main-content'>
        <MenuList />
      </main>
    </section>
  )
}