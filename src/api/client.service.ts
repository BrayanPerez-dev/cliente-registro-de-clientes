import { instance } from "./instance"
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
  }
export const getClients = async  () => {
    try {
        const response = await instance('client','GET')
        return response.data
    } catch (error) {
        return error
    }
}

export const saveClient = async  (values:ClientData) => {
    try {
        const response = await instance('client','POST',values as never)
        if (response.status !==  'ok' ) {
            throw new Error(JSON.stringify(response)); 
          }
        return response
    } catch (error) {
        if(error){
            throw error;
        }
    }
}

export const editClient = async  (idClient:number,values:ClientData) => {
    try {
        const response = await instance(`client/${idClient}`,'PATCH',values as never)
        return response
    } catch (error) {
        if(error){
            throw error;
        }

    }
}