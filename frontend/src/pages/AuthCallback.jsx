import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { authAPI } from '../services/api';
import toast from 'react-hot-toast';

function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setAuth = useAuthStore(state => state.setAuth);

  useEffect(() => {
    const handleAuth = async () => {
      const token = searchParams.get('token');
      const error = searchParams.get('error');

      if (error) {
        toast.error('Authentication failed. Please try again.');
        navigate('/');
        return;
      }

      if (token) {
        try {
          // Store token temporarily
          localStorage.setItem('temp-token', token);
          
          // Fetch user data
          const response = await authAPI.getUser();
          const user = response.data.data;
          
          // Set auth state
          setAuth(user, token);
          
          // Clean up
          localStorage.removeItem('temp-token');
          
          toast.success(`Welcome back, ${user.name}!`);
          navigate('/generator');
        } catch (error) {
          console.error('Auth error:', error);
          toast.error('Failed to authenticate. Please try again.');
          navigate('/');
        }
      } else {
        navigate('/');
      }
    };

    handleAuth();
  }, [searchParams, navigate, setAuth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600 mx-auto mb-4"></div>
        <p className="text-xl">Authenticating...</p>
      </div>
    </div>
  );
}

export default AuthCallback;
