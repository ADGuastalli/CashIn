import React from "react";

const ChatComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h2 className="text-2xl mb-4">Chat IA</h2>
      <iframe
        src="https://chatgpt.com/g/g-R6OiPvkkm-cashinbot"
        className="w-full h-full border-none"
        title="Chat IA"
      />
    </div>
  );
};

export default ChatComponent;
