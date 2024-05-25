
export const instance = async (url:string,method:string,body?: never) => {
    const apiHost = 'http://localhost:8000/api/v1/'
    
      const options = {
        method,
        headers: {
          'Content-Type': 'application/json' ,
          'authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body:JSON.stringify(body)
      };
     
      const response = await fetch(apiHost + url, options);
    
      return response.json()
  
}