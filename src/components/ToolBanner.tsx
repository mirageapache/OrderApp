import 'styles/css/toolBanner.css'
import {ReactComponent as IconCart} from 'assets/icons/cart.svg'
import {ReactComponent as IconGrid} from 'assets/icons/grid.svg'
import {ReactComponent as IconList} from 'assets/icons/list.svg'

export default function MenuList(){
  return(
    <div className="tool-banner">
      <IconCart className='icon cart-icon'/>
      <span className='icon-group'>
        <IconGrid className='icon' />
        <IconList className='icon' />
      </span>
    </div>
  )
}