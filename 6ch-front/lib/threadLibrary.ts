import axios from "axios";

const api = axios.create({
  baseURL: "http://backend:9000",
  timeout: 10000,
  withCredentials: true,
});

export const getAllThreadIds = async () => {
  const url = `/threads`;
  try {
    const { data } = await api.get<thread[]>(url);
    return data.map((item) => {
      return (
        {
          params: {
            id: String(item.id)
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

export const getThreadData = async (id: number) => {
  try {
    const { data: thread } = await api.get<thread>(`/thread/${id}`);
    return {
      id,
      thread
    };
  } catch (error) {
    console.log(error);
  }
};
