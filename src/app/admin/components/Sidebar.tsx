import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faBars, faBarsStaggered, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useSidebar } from '@/app/context/SidebarContext';

const SidebarContainer = styled.div<{ visible: boolean }>`
  width: ${({ visible }) => (visible ? '15vw' : '5vw')};
  transition: width 0.3s;
  height: 100vh;
  background: linear-gradient(to bottom, #09024b, #090165, #3636b0);
  color: white;
  display: flex;
  position: fixed;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: ${({ visible }) => (visible ? 'flex-start' : 'center')};
  padding: ${({ visible }) => (visible ? '1vw' : '0')};
`;

const ToggleButton = styled.div<{ visible: boolean }>`
  text-align: center;
  width: 100%;
  transition: transform 0.3s, font-size 0.3s, padding 0.3s;
  font-size: ${({ visible }) => (visible ? '2vw' : '1.5vw')};
  cursor: pointer;
  padding: ${({ visible }) => (visible ? '0 0 0 3vw' : '0')};
  &:hover {
    transform: scale(1.2);
  }
`;

const NavItem = styled.div`
  margin: 1vw 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  cursor: pointer;
  padding: 1vw;
  width: 100%;
  font-size: 1.5em;
  &:hover {
    background-color: #05314d;
  }
`;

const NavText = styled.span<{ visible: boolean }>`
  margin-left: 10px;
  display: ${({ visible }) => (visible ? 'inline' : 'none')};
  text-align: center;
  transition: margin-left 0.3s;
`;

const Sidebar = () => {
  const { visible, toggleSidebar } = useSidebar()

  return (
    <SidebarContainer visible={visible} onMouseEnter={toggleSidebar} onMouseLeave={toggleSidebar}>
      <ToggleButton visible={visible}>
        <FontAwesomeIcon icon={visible ? faBarsStaggered : faBars} size="lg" />
      </ToggleButton>
      <NavItem>
        <NavText visible={visible}>Principal</NavText>
        <FontAwesomeIcon icon={faChevronRight} />
      </NavItem>
      <NavItem>
        <NavText visible={visible}>Mensajes</NavText>
        <FontAwesomeIcon icon={faChevronRight} />
      </NavItem>
      <NavItem>
        <NavText visible={visible}>Salir</NavText>
        <FontAwesomeIcon icon={faArrowRightFromBracket} rotation={180} />
      </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
