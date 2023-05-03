import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ------------------------------------------------------------------------

export default function App() {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Token Check');
    const token = localStorage.getItem('auth');
    console.log(token);
    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (decodedToken.exp < Date.now() / 1000) {
          // Token has expired
          setIsTokenExpired(true);
          localStorage.removeItem('auth');
          navigate('/login'); // Redirect user to login page
        }
      } catch (error) {
        console.error('Invalid Token:', error);
        localStorage.removeItem('auth');
        navigate('/login'); // Redirect user to login page
      }
    }

    // Cleanup function
    return () => {
      // Cancel any ongoing subscriptions or asynchronous tasks here
    };
  }, [navigate]);

  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <BaseOptionChartStyle />
      <Router />
    </ThemeConfig>
  );
}
