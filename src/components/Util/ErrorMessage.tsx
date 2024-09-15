import React from 'react';

interface ErrorMessage {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessage> = ({ message }) => {
    return <div className="text-red-500 text-center p-4">Error: {message}</div>;
};

export default ErrorMessage;