import { useEffect, useState } from "react";
import { fetchCurrentUser, getUser } from "../services/UserService";
import { useAuth } from "../context/AuthContext";
import { User } from "../models/User";

const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | any>();
  const { user } = useAuth();



  const loadUser = async () => {
    if (!user) return;
    setLoading(true);
    const fetchedUser = await fetchCurrentUser(user.uid);
    setCurrentUser(fetchedUser);
    setLoading(false);
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
