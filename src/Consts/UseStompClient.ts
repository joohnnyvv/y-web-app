import { useEffect, useRef, useState } from "react";
import { Client } from "@stomp/stompjs";

const useStompClient = (url?: string) => {
  const [messages, setMessages] = useState<string[]>([]);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: url,
      onConnect: () => {
        console.log("Connected to STOMP server");
        client.subscribe('/topic/comments', (message) => {
          setMessages((prevMessages) => [...prevMessages, message.body]);
        });
      },
      onStompError: (error) => {
        console.error("STOMP error", error);
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [url]);

  return messages;
};

export default useStompClient;
