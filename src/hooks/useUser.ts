import { useEffect, useState } from "react";
import { fetchCurrentUser } from "../services/UserService";
import { useAuth } from "../context/AuthContext";
import { User } from "../models/User";

const useUser = () => {
  const [currentUser, setCurrentUser] = useState<User | any>();
  const { user } = useAuth();

  const loadUser = async () => {
    if (!user) return;

    const fetchedUser = await fetchCurrentUser(user.uid);
    setCurrentUser(fetchedUser);
  };

  useEffect(() => {
    loadUser();
  }, [user]);

  return {
    currentUser,
    useUser,
  };
};

export default useUser;
