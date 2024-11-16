import { useState } from "react";

type Author = "user" | "bot";

type Chat = {
  author: Author;
  message: string;
};

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState<Chat[]>([
    {
      author: "bot",
      message: "Halo, ada yang bisa dibantu?",
    },
  ]);

  const handleSend = async () => {
    setChats((prevChats) => [
      ...prevChats,
      {
        author: "user",
        message: message,
      },
    ]);

    setMessage("");

    const response = await fetch(`${API_BASE_URL}/api/v1/chats`, {
      headers: {
        "X-Api-Key": "123456",
      },
      method: "POST",
      body: JSON.stringify({ message }),
    });

    const result = await response.json();

    if (!response.ok) alert(result.message);

    setChats((prevChats) => [...prevChats, result.data]);
  };

  return (
    <div className="space-y-2 p-5">
      <h3 className="text-md font-semibold">Welcome Back</h3>
      <div className="space-y-2 border p-2">
        {chats.map((chat, index) => (
          <ChatItem key={index} chat={chat} />
        ))}
      </div>

      <div className="flex space-x-2">
        <textarea
          className="flex-1 border p-2"
          value={message}
          rows={3}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ketik pesan di sini..."
        />
        <button
          className="bg-blue-500 w-[150px] text-white px-4 py-2"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
    </div>
  );
}

interface ChatItemProps {
  chat: Chat;
}

const ChatItem = ({ chat }: ChatItemProps) => {
  return (
    <div
      className={`${
        chat.author == "bot" ? "text-left" : "text-right"
      } rounded-md border py-2 px-4`}
    >
      <div className="font-semibold">{chat.author}</div>
      <div>{chat.message}</div>
    </div>
  );
};

export default App;
