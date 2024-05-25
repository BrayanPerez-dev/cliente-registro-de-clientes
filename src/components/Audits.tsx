import { Drawer, Table } from "antd";
import { FC, ReactElement, useEffect, useState } from "react";
import { getAudits } from "../api/audit.service";
import styled from "styled-components";
import dayjs from "dayjs";

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
  open: boolean;
  client?: Client | null;
  onClose: () => void;
}
interface Audit {
    id: number;
    action: string;
    oldValues: Client;
    newValues: Client;
    clientId: number;
    createdAt: string;
    updatedAt: string;
  }
const Audits: FC<Props> = ({ open, onClose, client }): ReactElement  => {
  const [data, setData] = useState<Audit[]>([]);
  const loadData = async () => {
    if (client?.id) {
      const data = await getAudits(client?.id);
      setData(data)
    }
  };
  useEffect(() => {
    setData([])
    loadData();
  }, [open,client]);
  const columns  = [
    {
        title: "Accion",
        dataIndex: "action",
        key: "action",
      },
    {
        title: "Creada el",
        dataIndex: "createdAt",
        key: "createdAt",
        render: (date: string) => dayjs(date).format("DD/MM/YYYY"),
      },
      {
        title: "Antes",
        dataIndex: "oldValues",
        key: "oldValues",
        render: (values:Client) => JSON.stringify(values,null, 2),
      },
      {
        title: "Despues",
        dataIndex: "newValues",
        key: "newValues",
        render: (values:Client) =>JSON.stringify(values,null, 2),
      },
      
  ]
  if (!client?.id) return <></>;

  return (
    <Drawer open={open} onClose={onClose} size="large">
      <Wrapper>
         <h1> Auditorias</h1>
        <h2> {`${client.firstName} ${client.secondName} ${client.firstSurname} ${client.secondSurname}`}</h2>

        <Table columns={columns} dataSource={data} />
      </Wrapper>
    </Drawer>
  );
};
const Wrapper = styled.div`
  h1{
    color:#5bc500;
  }
  h2{
    color:#019df4;
  }
`;

export default Audits;
