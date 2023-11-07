import axios from "axios";
const BASE_URL = "http://localhost:3000/api/dto";

class ApiService {
  static async registerUser(data, token) {
    try {
      await axios.post(
        `${BASE_URL}/register`,
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  }
  static async createRequest(data, token) {
    try {
      await axios.post(
        `${BASE_URL}/create`,
        { data: data },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async fetchNotifications(userId) {
    try {
      return await axios.get(`${BASE_URL}/notification/${userId}`);
    } catch (error) {}
  }
  static async updateFcm(userId, token) {
    try {
      return await axios.put(`${BASE_URL}/fcm`, {
        uid: userId,
        fcmToken: token,
      });
    } catch (error) {}
  }
  static async fetchRequest(userId) {
    return await axios.get(`${BASE_URL}/user/requests/${userId}`);
  }
  static async fetchUserRequests() {
    try {
      return await axios.get(`${BASE_URL}/requests`);
    } catch (error) {
      if (error.isAxiosError && !error.response) {
        throw new Error(
          "Network error. Please check your internet connection."
        );
      }
      throw new Error(error.message);
    }
  }
  static async createResponse(requestId, status) {
    try {
      await axios.put(`${BASE_URL}/request/${requestId}`, {
        status,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async completeRequest(requestId, status, data) {
    try {
      await axios.put(`${BASE_URL}/request/${requestId}`, {
        status: status,
        data: data,
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
  static async readNotification(notificationId) {
    try {
      await axios.put(`${BASE_URL}/notification/${notificationId}`);
    } catch (error) {}
  }
}

export default ApiService;
