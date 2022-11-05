import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/Router';
import { store } from '@state/store';
import { Provider } from 'react-redux';
import AxiosInstanceProvider from './infrastructure/context/ApiContext';
import { SocketProvider } from './infrastructure/context/SocketContext';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#1ADB5D',
            },
        },
    });
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AxiosInstanceProvider>
                    <SocketProvider>
                        <QueryClientProvider client={new QueryClient()}>
                            <ThemeProvider theme={theme}>
                                {!isLoading && <AppRouter />}
                            </ThemeProvider>
                        </QueryClientProvider>
                    </SocketProvider>
                </AxiosInstanceProvider>
            </BrowserRouter>
        </Provider>
    );
}

export default App;
