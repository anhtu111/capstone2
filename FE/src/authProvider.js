import axios from "axios";

const apiUrl = "http://localhost:9000";

const authProvider = {
  login: async ({ username, password }) => {
    try {
      const loginResponse = await axios.post(`${apiUrl}/authenticate`, {
        username,
        password,
      });
      const token = loginResponse.data.token;
      localStorage.setItem("token", token);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },

  checkError: () => Promise.resolve(),

  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),

  getPermissions: () => Promise.resolve(),
};

export default authProvider;
