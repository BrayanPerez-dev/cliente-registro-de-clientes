import { Button, Form, Input, Modal, notification } from "antd";
import { FC, ReactElement, useEffect } from "react";
import { editClient, saveClient } from "../api/client.service";
interface Client {
  id: number;
  firstName: string;
  secondName: string;
  firstSurname: string;
  secondSurname: string;
  firstAdress: string;
  secondAdress: string;
  dui: string;
  nit: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
}
interface Props {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  loadData: () => void;
  client?: Client | null;
}
const AddEditClient: FC<Props> = ({
  openModal,
  setOpenModal,
  loadData,
  client,
}): ReactElement => {
  const [form] = Form.useForm();

  const onCancel = () => {
    form.resetFields();

    setOpenModal(false);
  };
  const onFinish = async (values: Client) => {
    try {
     
      if (!client?.id) {
        values.userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        const res =  await saveClient(values);
        notification.success({ message: res?.message });
        form.resetFields();
      } else {
        values.userId = JSON.parse(localStorage.getItem("user") || "{}").id;
        values.dui = values.dui.toString()
        values.nit = values.nit.toString()

        const res = await editClient(client.id, values);


        notification.success({ message: res?.message });

      }
      loadData();
    } catch (error : unknown) {
      if (error instanceof Error) {
        notification.error({ message: JSON.parse(error?.message).message });
    }
  }
}
  useEffect(() => {
    if (client?.id) {
        form.setFieldsValue({...client})
    }
  }, [openModal,client])
  
  return (
    <div>
      <Modal open={openModal} onCancel={onCancel} destroyOnClose footer={null}>
        <h1 style={{color:'#5bc500'}}> {client?.id ? 'Editar' : 'Nuevo'} Cliente</h1>
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Form.Item
            label="Primer Nombre"
            name="firstName"
            rules={[
              { required: true, message: "Por favor llena tu primer nombre!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Segundo Nombre"
            name="secondName"
            rules={[
              { required: true, message: "Por favor llena tu segundo nombre!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Primer Apellido"
            name="firstSurname"
            rules={[
              {
                required: true,
                message: "Por favor llena tu primer apellido!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Segundo Apellido"
            name="secondSurname"
            rules={[
              {
                required: true,
                message: "Por favor llena tu segundo apellido!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Primera Direccion"
            name="firstAdress"
            rules={[
              {
                required: true,
                message: "Por favor llena tu primera direccion!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Segunda Direccion" name="secondAdress">
            <Input />
          </Form.Item>

          <Form.Item
            label="DUI"
            name="dui"
            rules={[{ required: true, message: "Por favor llena tu DUI!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="NIT"
            name="nit"
            rules={[{ required: true, message: "Por favor llena tu NIT!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: "100%",backgroundColor:'#019df4' }}>
              Guardar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddEditClient;
