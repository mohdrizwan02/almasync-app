import axios from "axios";

export const useUser = async () => {
  try {
    const response = await axios.get("/api/get-user");
    if (response.data.success) {
      const userId = response.data.user;
      const name = response.data.name;
      return {userId , name}
    }
    return null;
  } catch (error) {
    return null;
  }
};
