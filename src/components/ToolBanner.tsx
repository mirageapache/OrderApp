import 'styles/css/toolBanner.css'
import {ReactComponent as IconCart} from 'assets/icons/cart.svg'
import {ReactComponent as IconGrid} from 'assets/icons/grid.svg'
import {ReactComponent as IconList} from 'assets/icons/list.svg'
import { useSetting } from 'context/SettingContext';

export default function MenuList(){
  const {menuMode, setMenuMode} = useSetting();

  return(
    <nav className="tool-banner">
      <IconCart className='icon cart-icon'/>
      <span className='icon-group'>
        {menuMode === 'list-mode'?
          <IconGrid className='icon' onClick={() => { setMenuMode('grid-mode') }} />
        :
          <IconList className='icon' onClick={() => { setMenuMode('list-mode') }} />
        }
      </span>
    </nav>
  )
}