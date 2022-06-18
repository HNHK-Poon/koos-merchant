import React, { createContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { transactionUpdate } from '../state/transaction';

export const SocketContext = createContext({});

const SocketProvider = (props: any) => {
    const [socket, setSocket] = useState<any>(null);
    const [userId, setUserId] = useState<any>(null);
    const dispatch = useDispatch();

    const init = (userId: any) => {
        if (userId) {
            setUserId(userId);
        }
        if (!socket) {
            setSocket(io(import.meta.env.VITE_SOCKET_URL));
        }
    };

    useEffect(() => {
        if (socket) {
            socket.emit('merchant:join', { userId: userId });

            socket.on('connect', () => {
                console.log('connected', socket.id); // x8WIv7-mJelg7on_ALbx
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

            socket.on('transaction:confirmed', (params: any) => {
                console.log('transaction:confirmed', params);
                // dispatch(
                //     transactionUpdate({
                //         id: params.id,
                //         changes: params.changes,
                //     })
                // );
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
