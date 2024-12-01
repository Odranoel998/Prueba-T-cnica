import axios, { AxiosResponse } from "axios";

const API_URL = "http://localhost:8000/scripts"; 


export interface Script {
  id: string;
  title: string;
  description?: string;
}

// Obtener todos los scripts
export const getScripts = async (): Promise<Script[]> => {
  try {
    const response: AxiosResponse<Script[]> = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los scripts:", error);
    throw error;
  }
};

// Crear un nuevo script
export const createScript = async (scriptData: Omit<Script, "id">): Promise<Script> => {
  try {
    const response: AxiosResponse<Script> = await axios.post(API_URL, scriptData);
    return response.data;
  } catch (error) {
    console.error("Error al crear el script:", error);
    throw error;
  }
};

// Obtener un script por su ID
export const getScriptById = async (scriptId: string): Promise<Script> => {
  try {
    const response: AxiosResponse<Script> = await axios.get(`${API_URL}/${scriptId}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el script:", error);
    throw error;
  }
};

// Editar un script
export const editScript = async (scriptId: string, updatedData: Partial<Script>): Promise<Script> => {
  try {
    const response: AxiosResponse<Script> = await axios.put(`${API_URL}/${scriptId}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error al editar el script:", error);
    throw error;
  }
};

// Eliminar un script
export const deleteScript = async (scriptId: string): Promise<{ message: string }> => {
  try {
    const response: AxiosResponse<{ message: string }> = await axios.delete(`${API_URL}/${scriptId}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar el script:", error);
    throw error;
  }
};
