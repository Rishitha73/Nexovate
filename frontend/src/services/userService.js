import api from './api';

export const userService = {
  // Get current user from localStorage
  getCurrentUserId: () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user._id;
  },

  // Get user profile
  getProfile: async () => {
    const userId = userService.getCurrentUserId();
    if (!userId) throw new Error('User not authenticated');
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },

  // Update user profile
  updateProfile: async (userData) => {
    try {
      const userId = userService.getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');
      
      const response = await api.put(`/users/${userId}`, {
        name: userData.name,
        email: userData.email
      });
      
      if (response.data) {
        const updatedUser = {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          role: response.data.role
        };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to update profile' };
    }
  },

  // Change password
  changePassword: async (currentPassword, newPassword) => {
    try {
      const userId = userService.getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');
      
      const response = await api.put(`/users/${userId}`, {
        password: newPassword
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to change password' };
    }
  },

  // Delete account
  deleteAccount: async () => {
    try {
      const userId = userService.getCurrentUserId();
      if (!userId) throw new Error('User not authenticated');
      
      const response = await api.delete(`/users/${userId}`);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'Failed to delete account' };
    }
  }
};
