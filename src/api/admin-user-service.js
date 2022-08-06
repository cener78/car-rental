import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getUsers = () => {
  return axios.get(`${API_URL}/user/auth/all`, { headers: authHeader() });
};

const getUser = (id) => {
  return axios.get(`${API_URL}/user/${id}/auth`, { headers: authHeader() });
};

const createUser = (user) => {
  return axios.post(`${API_URL}/add`, user, { headers: authHeader() });
};

const updateUser = (id, user) => {
  return axios.put(`${API_URL}/user/${id}/auth`, user, { headers: authHeader() });
};

const deleteUser = (id) => {
  return axios.delete(`${API_URL}/user/${id}/auth`, { headers: authHeader() });
};



const downloadUsers = () => {
  return axios.get(`${API_URL}/excel/download/users`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: 'blob'
  });
};




export { getUsers, getUser, createUser, updateUser, deleteUser, downloadUsers };
