"use client";

import { createContext, useContext } from "react";
import type { User } from "@supabase/supabase-js";

type UserContextType = {
  user: User;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) => {
  return (
    <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context.user;
};
