import client from "./client";
import axios from "axios";
const api_suffix = "/api/users/";

export const signup = async (body) => {
  try {
    const { data } = await client.post(`${api_suffix}signup`, body, {
      withCredentials: true,
      method: "POST",
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const completeProfile = async (body, id) => {
  try {
    console.log(body);
    const { data } = await client.post(
      `${api_suffix}complete/profile/${id}`,
      body,
      {
        withCredentials: true,
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        data: body,
      }
    );
    // const data.
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
  // axios.post(`${import.meta.env.VITE_API_BASE_URL}${api_suffix}complete/profile/${id}`, body, {headers: {"Content-Type": "multipart/form-data"}}, data: formData).then(response => )
};

export const completeCompanyProfile = async (body, id) => {
  try {
    console.log(body);
    const { data } = await client.post(
      `${api_suffix}complete/company/${id}`,
      body,
      {
        withCredentials: true,
        method: "POST",
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        data: body,
      }
    );
    // const data.
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
  // axios.post(`${import.meta.env.VITE_API_BASE_URL}${api_suffix}complete/profile/${id}`, body, {headers: {"Content-Type": "multipart/form-data"}}, data: formData).then(response => )
};

export const updateProfile = async (body, id) => {
  try {
    const { data } = await client.put(
      `${api_suffix}update/profile/${id}`,
      body,
      {
        withCredentials: true,
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const signin = async (credentials) => {
  try {
    const { data } = await client.post(`${api_suffix}signin`, credentials, {
      withCredentials: true,
      method: "POST",
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const logout = async () => {
  try {
    const { data } = await client.get(`${api_suffix}logout`, {
      withCredentials: true,
      method: "GET",
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const profile = async (id) => {
  try {
    // alert(id);
    const { data } = await client.get(`${api_suffix}me/${id}`, {
      withCredentials: true,
      method: "GET",
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getProfile = async (id) => {
  try {
    const { data } = await client.get(`${api_suffix}profile/${id}`, {
      withCredentials: true,
      method: "GET",
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getUser = async (id) => {
  try {
    const { data } = await client.get(`${api_suffix}single/${id}`, {
      withCredentials: true,
      method: "GET",
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};

export const getAllUsers = async () => {
  try {
    const { data } = await client.get(`${api_suffix}all`, {
      withCredentials: true,
      method: "GET",
    });
    // console.log(data);
    return data;
  } catch (error) {
    // console.log(error);
    return error;
  }
};
