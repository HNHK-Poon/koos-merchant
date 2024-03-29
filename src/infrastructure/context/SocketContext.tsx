import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { transactionUpdate } from '../state/transaction';

export const SocketContext = createContext({});

const SocketProvider = (props: any) => {
    const [socket, setSocket] = useState<any>(null);
    const [userId, setUserId] = useState<any>(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const init = (userId: any) => {
        if (userId) {
            setUserId(userId);
        }
        if (socket) {
            console.log('socket already initialized', socket, socket.connected);
            if (!socket.connected) {
                console.log('socket disconnected!!!');
                // dispatch(editStatus({ key: 'isSocketLoading', value: true }));
                // navigate('/login');
                // socket.connect();
            }
        }
        if (!socket) {
            console.log('initing socket');
            let _socket = io(import.meta.env.VITE_SOCKET_URL);
            setSocket(_socket);
            // setSocket(io(import.meta.env.VITE_SOCKET_URL));
        }

    };

    useEffect(() => {
        if (socket) {
            console.log('merchant join', userId);
            socket.emit('merchant:join', { userId: userId });

            socket.on('connect', () => {
                console.log('socket connected', socket.id); // x8WIv7-mJelg7on_ALbx
            });

            socket.on('transaction:paid', (params: any) => {
                console.log('transaction:paid', params);
                // dispatch(
                //     transactionUpdate({
                //         id: params.id,
                //         changes: params.changes,
                //     })
                // );
            });

            socket.on('transaction:created', (message: any) => {
                console.log('transaction:created', message);
                navigate(`/transaction/${message.TransactionId}`, {state: {isCreated: true}})
                // dispatch(transactionAdded(message));
            });

            socket.on('wallet-transaction:created', (message: any) => {
                console.log('wallet-transaction:created', message);
                navigate(`/wallettransaction/${message.TransactionId}`, {state: {isCreated: true}})
                // dispatch(transactionAdded(message));
            });

        }
    }, [socket, userId]);

    return (
        <SocketContext.Provider
            value={{
                init,
                setUserId
            }}
        >
            {props.children}
        </SocketContext.Provider>
    );
};

function useSocket() {
    const context = React.useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}

export { SocketProvider, useSocket };
