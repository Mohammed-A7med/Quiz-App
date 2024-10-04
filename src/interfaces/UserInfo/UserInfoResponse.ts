import { ReactNode } from "react";

interface UserProfile {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  role: string;
}

interface UserInfo {
  accessToken: string;
  profile: UserProfile;
}

export interface UserData {
  message: string;
  data: UserInfo;
}

export interface AuthContextType {
  userData: UserData | null;
  saveUserData: () => void;
}

export interface AuthContextProviderProps {
  children: ReactNode;
}
