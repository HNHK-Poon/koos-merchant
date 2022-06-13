import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/Router';
import { store } from '@state/store';
import { Provider } from 'react-redux';
import AxiosInstanceProvider from './infrastructure/context/ApiContext';
import { SocketProvider } from './infrastructure/context/SocketContext';

function App() {
    return (
        <Provider store={store}>
            <AxiosInstanceProvider>
                <SocketProvider>
                    <AppRouter />
                </SocketProvider>
            </AxiosInstanceProvider>
        </Provider>
    );
}

export default App;
