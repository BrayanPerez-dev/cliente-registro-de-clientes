import { instance } from "./instance"


export const getAudits = async  (id:number) => {
    try {
        const response = await instance('auditlogs/'+id,'GET')
        return response.data
    } catch (error) {
        return error
    }
}
