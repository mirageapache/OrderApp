import { useEffect } from "react"
import { useNavigate } from "react-router"

export default function HomePage(){
  const navigate = useNavigate();
  useEffect(()=>{
    navigate('/');
  })

  return <div>HomePage</div>
}