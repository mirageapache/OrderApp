import 'styles/css/header.css'
import {ReactComponent as IconCart} from 'assets/icons/cart.svg'

type HeaderProps = {
  title: string
}

export default function Header ( props: HeaderProps ) {
  const { title } = props;

  return (
    <div className="header">
      <h2 className='brand-title'>{title}</h2>
      <IconCart className='icon cart-icon'/>
    </div>
  )
}
