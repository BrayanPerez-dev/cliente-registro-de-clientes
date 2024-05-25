import { Button, Form, Input, notification } from "antd";
import styled from "styled-components";
import { login } from "../api/login.service";
import { useNavigate } from "react-router-dom";
type FieldType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate()
  const onFinish = async ({email,password}:FieldType) => {
    await login(email, password)
    .then(() => {
      navigate('/clientes')
    })
    .catch((error) => {
      notification.error({message:JSON.parse(error?.message).message})
    });

  };
  return (
    <Wrapper>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ width: 800 }}
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"
      >
        <Form.Item<FieldType>
          label="Correo"
          name="email"
          rules={[{ required: true, message: "Por favor ingresa tu correo!" },{type:'email'}]}
        >
          <Input style={{width:400}} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Por favor Ingresa tu contraseña!" },
          ]}
        >
          <Input.Password style={{width:400}}/>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit">
            Iniciar Sesion
          </Button>
        </Form.Item>
      </Form>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    .ant-form{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center
    }
`

export default Login;
