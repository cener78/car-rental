import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

const getReservations = () => {
  return axios.get(`${API_URL}/reservations/admin/all`, { headers: authHeader() });
};

const getReservation = (id) => {
  return axios.get(`${API_URL}/reservations/${id}/admin`, { headers: authHeader() });
};

const deleteReservation = (id) => {
  return axios.delete(`${API_URL}/reservations/admin/${id}/auth`, { headers: authHeader() });
};

const updateReservation = (id, carId, reservation) => {
  return axios.put(`${API_URL}/reservations/admin/auth?carId=${carId}&reservationId=${id}`, reservation, { headers: authHeader() });
};


const downloadReservations = () => {
  return axios.get(`${API_URL}/excel/download/reservations`, {
    headers: {
      ...authHeader(),
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
    responseType: 'blob'
  });
};




export { getReservations, getReservation, deleteReservation, updateReservation, downloadReservations };
