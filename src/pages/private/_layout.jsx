import styled from "styled-components";
import Navbar from "../../components/ui/navbar";
import Sidebar from "../../components/ui/sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const sidebarWidth = "260px"; // constante reutilizable
  return (
    <Conteiner>
      <Sidebar />
      <DivPage>
        <Navbar sidebarWidth={sidebarWidth} />
        <DivOutlet>
          <Outlet />
        </DivOutlet>
      </DivPage>
    </Conteiner>
  );
};

export default Layout;

const Conteiner = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
`;

const DivPage = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* para ocupar espacio restante del sidebar */
`;

const DivOutlet = styled.div`
  height: calc(100vh - 60px);
  overflow: auto;
`;
