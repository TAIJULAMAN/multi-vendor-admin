import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { loginStart, loginSuccess, loginFailure, logout } from '../redux/features/authSlice';

export function useAuth() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const login = async (credentials) => {
    try {
      dispatch(loginStart());
      const response = await authAPI.login(credentials);
      dispatch(loginSuccess(response.data));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.response?.data?.message || 'Login failed'));
    }
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      dispatch(logout());
      navigate('/login');
    }
  };

  const forgotPassword = async (email) => {
    try {
      await authAPI.forgotPassword(email);
      navigate('/verify');
    } catch (error) {
      throw error.response?.data?.message || 'Failed to send reset code';
    }
  };

  const verifyCode = async (code) => {
    try {
      await authAPI.verifyCode(code);
      navigate('/reset-password');
    } catch (error) {
      throw error.response?.data?.message || 'Invalid verification code';
    }
  };

  const resetPassword = async (data) => {
    try {
      await authAPI.resetPassword(data);
      navigate('/login');
    } catch (error) {
      throw error.response?.data?.message || 'Failed to reset password';
    }
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout: handleLogout,
    forgotPassword,
    verifyCode,
    resetPassword,
  };
}
