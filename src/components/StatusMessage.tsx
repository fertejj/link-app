import React from "react";

interface StatusMessageProps {
  message: string;
}

const StatusMessage: React.FC<StatusMessageProps> = ({ message }) => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <h1 className="text-2xl font-bold text-gray-800">{message}</h1>
  </div>
);

export default StatusMessage;
