import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate()

  return (
    <div style={{textAlign:'right'}}>   
 <Button
    type="primary"
    style={{backgroundColor:'#019df4'}}
    onClick={() => {
      localStorage.clear()
      navigate('/')
    }}
  >
    Cerrar Sesion
  </Button></div>
  )
}

export default Logout