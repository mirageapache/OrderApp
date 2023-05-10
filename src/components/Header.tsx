import 'styles/css/header.css'


type HeaderProps = {
  title: string
}

export default function Header ( props: HeaderProps ) {
  const { title } = props;
  return (
    <div className="header">
      <h2 className='brand-title'>{title}</h2>

    </div>
  )
}
