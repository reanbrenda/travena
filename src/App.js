import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import 'react-toastify/dist/ReactToastify.css';
import { AppContext, AppContextProvider } from './context/AppContext';
import LoginDialog from './components/login-dialog/LoginDialog';

// ----------------------------------------------------------------------

export default function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnmount: false,
        refetchOnReconnect: false,
        retry: 0,
        staleTime: 5 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppContextProvider>
          <ScrollToTop />
          <BaseOptionChartStyle />
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <Router />
          <AppContext.Consumer>{(value) => value.loginDialogOpen && <LoginDialog />}</AppContext.Consumer>
        </AppContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
