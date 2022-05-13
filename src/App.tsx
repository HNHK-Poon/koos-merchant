import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import AppRouter from './routes/Router';
import { store } from '@state/store';
import { Provider } from 'react-redux';
import AxiosInstanceProvider from './infrastructure/context/ApiContext';

function App() {
    return (
        <Provider store={store}>
            <AxiosInstanceProvider>
                <AppRouter />
            </AxiosInstanceProvider>
        </Provider>
    );
}

export default App;
