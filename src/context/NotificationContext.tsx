import { createContext, useContext, useEffect, useState } from "react";

type Message = {
  text: string;
  type: "error" | "success";
};

interface NotificationContextProps {
  message: Message | null;
  setMessage: React.Dispatch<React.SetStateAction<Message | null>>;
}

const NotificationContext = createContext<NotificationContextProps>({
  message: null,
  setMessage: () => {},
});

export function useNotification() {
  return useContext(NotificationContext);
}

export default function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (!message) return;
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }, [message]);

  const value = { message, setMessage };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className={`notification ${message ? message.type : "hide"}`}>
        {message?.text}
      </div>
    </NotificationContext.Provider>
  );
}
