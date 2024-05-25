import { instance } from "./instance";

export const login = async (
  email: string,
  password: string
) => {
    try {
        const res = await instance("auth/login", "POST", {
          email: email,
          password: password,
        } as never);
    
        if (res.status !==  'ok' ) {
          throw new Error(JSON.stringify(res)); 
        }
        localStorage.setItem('token', res.result.data.token);
        localStorage.setItem('user', JSON.stringify(res.result.data));
    
        return res; 
      } catch (error) {
        if(error){
            throw error; 
        }
      }
 
};
