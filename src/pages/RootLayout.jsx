import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import AuthProvider from "../contexts/AuthContext";

import styles from "./styles/RootLayout.module.css";

export default function RootLayout() {
  return (
    <>
      <AuthProvider>
        <Header
          showOptions={{
            search: true,
            home: true,
            profile: true,
            create: true,
          }}
        />
        <div className={styles.outlet}>
          <Outlet />
        </div>
      </AuthProvider>
    </>
  );
}
