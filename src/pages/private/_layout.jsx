import styled from "styled-components";
import Navbar from "../../components/ui/navbar";
import Sidebar from "../../components/ui/sidebar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Conteiner>
      <Sidebar />
      <DivPage>
        <Navbar />
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
`;

const DivOutlet = styled.div`
  height: calc(60px - 100vh);
`;
