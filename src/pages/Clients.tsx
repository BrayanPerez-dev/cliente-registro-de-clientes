import styled from "styled-components";
import { getClients } from "../api/client.service";
import { useEffect, useState } from "react";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import { DatabaseOutlined, EditOutlined } from "@ant-design/icons";
import AddEditClient from "../components/AddEditClient";
import { CSVLink } from "react-csv";
import Audits from "../components/Audits";
import Logout from "../components/Logout";

interface ClientData {
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
const Clients = () => {
  const [data, setData] = useState<ClientData[]>([]);
  const [client, setClient] = useState<ClientData | null>();

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);

  const loadData = async () => {
    const data = await getClients();
    setData(data);
  };
  useEffect(() => {
    loadData();
  }, []);
  const columns = [
    {
      title: "Nombre Completo",
      dataIndex: "firstName",
      key: "firstName",
      render: (__: unknown, record: ClientData) =>
        `${record.firstName} ${record.secondName} ${record.firstSurname} ${record.secondSurname}`,
    },
    {
      title: "Direccion 1",
      dataIndex: "firstAdress",
      key: "firstAdress",
    },
    {
      title: "Direccion 2",
      dataIndex: "secondAdress",
      key: "secondAdress",
    },
    {
      title: "DUI",
      dataIndex: "dui",
      key: "dui",
    },
    {
      title: "NIT",
      dataIndex: "nit",
      key: "nit",
    },
    {
      title: "Creada el",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Actualizada el",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
    },
    {
      title: "Editar",
      dataIndex: "clientId",
      key: "clientId",
      render: (__: unknown, record: ClientData) => (
        <EditOutlined
          className="icon"
          onClick={() => {
            setClient(record);
            setOpenModal(true);
          }}
        />
      ),
    },
    {
      title: "Auditoria",
      dataIndex: "clientId",
      key: "clientId",
      render: (__: unknown, record: ClientData) => (
        <DatabaseOutlined
          className="icon"
          onClick={() => {
            setClient(record);
            setOpenDrawer(true);
          }}
        />
      ),
    },
  ];
  const headers = [
    {
      label: "Id de Cliente",
      key: "id",
    },
    {
      label: "Nombre Completo",
      key: "firstName",
     
    },
    {
      label: "Direccion 1",
      key: "firstAdress",
    },
    {
      label: "Direccion 2",
      key: "secondAdress",
    },
    {
      label: "DUI",
      key: "dui",
    },
    {
      label: "NIT",
      key: "nit",
    },
    {
      label: "Creada el",
      key: "createdAt",
    },
    {
      label: "Actualizada el",
      key: "updatedAt",
    },
   
  ];
  return (
    <Wrapper>
      <Logout />
      <div className="header">
        <h1>Clientes</h1>
        <Button
          type="primary"
          style={{backgroundColor:'#019df4'}}
          onClick={() => {
            setClient(null);
            setOpenModal(true);
          }}
        >
          Nuevo Cliente
        </Button>
        <CSVLink data={data} headers={headers}>
          Exportar A CSV
        </CSVLink>
        ;
        <AddEditClient
          openModal={openModal}
          setOpenModal={setOpenModal}
          loadData={loadData}
          client={client}
        />
      </div>
      <Table dataSource={data} columns={columns} />
      <Audits open={openDrawer} client={client} onClose={() => setOpenDrawer(false) } />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  color: #5bc500;
  .header {
    display: flex;
    width: 100%;
    justify-content: flex-start;
    gap:50px;
    align-items: center;
  }
  .icon {
    color: #019df4;
    font-size: 20px;
  }
`;

export default Clients;
