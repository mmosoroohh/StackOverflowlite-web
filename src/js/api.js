import { get } from "https";

const baseUrl = 'http://127.0.0.1:5000/api/v2';

const api = {
    
  post(endpoint, data, token = null || localStorage.getItem("token")) {
    return fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
            mode: 'no-cors'      
        }
    });
  },

  get(endpoint, token=null || localStorage.getItem("token")) {
    return fetch(`${baseUrl}${endpoint}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        mode: 'no-cors'
      }
    });
  }

}

export default api;