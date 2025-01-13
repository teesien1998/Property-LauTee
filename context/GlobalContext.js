"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import getUnreadMessageCount from "@/app/actions/getUnreadMessageCount";

// Create Global Context
const GlobalContext = createContext();

// Create Proivder
export function GlobalProvider({ children }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      if (session && session.user) {
        const res = await getUnreadMessageCount();
        setUnreadCount(res.count);
      }
    };
    fetchUnreadMessages();
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </GlobalContext.Provider>
  );
}

export const useGlobalContext = () => useContext(GlobalContext);
