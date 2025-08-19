import { createContext, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Modal from "../components/common/Modal";
import API from '../../apiRoutes.js';
import { useSafeFetch } from "../hooks/useSafeFetch";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const [modalVisibility, setModalVisibility] = useState(false);
  const modalInfo = useRef({});
  const [url, setUrl] = useState('')

  const { data, error, loading, abort } = useSafeFetch(url, {method: 'GET', credentials: 'include'})

  useEffect(() => {

    /*
    const controller = new AbortController();

    const fetchUserData = async () => {
      try {
        const response = await fetch(API.USER.getUserData, {
          credentials: "include",
          signal: controller.signal,
        });

        if (response.ok) {
          const parsed = await response.json();
          if (parsed.code == "055") {
            setUser(parsed.user);
            setIsLoggedIn(true);
            return;
          } else if (parsed.code == "006") {
            setIsLoggedIn(false);
            return;
          } else {
            setIsLoggedIn(false);
          }
        } else {
          setIsLoggedIn(false);
        }
      } catch (e) {
        if (e.name == "AbortError") {
          return;
        }

        if (e.name == "TypeError") {
          modalInfo.current?.modifyModal?.({
            title: "Error",
            text: "A network related error occured",
            setButtonClick: null,
          });
          setModalVisibility(true);
        }

        setIsLoggedIn(false);
      }
    };
    */

    if (
      location.pathname == "/auth" ||
      location.pathname == "/" ||
      location.pathname == "/profile" ||
      location.pathname == "/create" ||
      location.pathname == '/dashboard'
    ) {
      setUrl(API.USER.getUserData)
    }

    return () => abort();
  }, [location.pathname]);

  useEffect(() => {
    const setFetchedData = () => {
      if (data?.code == "055") {
        setUser(data?.user);
        setIsLoggedIn(true);
        return;
      } else if (data?.code == "006") {
        setUser(null);
        setIsLoggedIn(false);
        return;
      } 

      if (error) {
        if (error.name == "AbortError") {
          return;
        }

        if (error.name == "TypeError") {
          modalInfo.current?.modifyModal?.({
            title: "Error",
            text: "A network related error occured",
            setButtonClick: null,
          });
          setModalVisibility(true);
          setIsLoggedIn(false);
        }
        
      }
    };

    setFetchedData()

  }, [data, error]);


  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedIn, setIsLoggedIn, user: user?.user || user, setUser }}
      >
        {children}
      </AuthContext.Provider>

      <Modal
        ref={modalInfo}
        visibility={modalVisibility}
        setVisibility={setModalVisibility}
      />
    </>
  );
};

export default AuthProvider;
