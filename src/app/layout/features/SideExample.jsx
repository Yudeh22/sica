import React from "react";
import { Sidebar, Menu, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom"; // Importar Link desde React Router

const CustomSidebar = ({ visible, onHide }) => {
  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      icon="labeled"
      inverted
      vertical
      visible={visible}
      onHide={onHide}
      style={{ width: "225px", backgroundColor: "#14539A", color: "#f9fafb" }}
    >
      <Menu.Item as="a" onClick={onHide}>
        <Icon name="close" />
        Cerrar
      </Menu.Item>
      <Menu.Item as={Link} to="/dashboard" onClick={onHide}>
        <Icon name="home" />
        Inicio - Clasificador
      </Menu.Item>
      <Menu.Item as={Link} to="/info" onClick={onHide}>
        <Icon name="info" />
        Información del proyecto
      </Menu.Item>
      <Menu.Item as={Link} to="/envivo" onClick={onHide}>
        <Icon name="video" />
        Reconocimiento en vivo
      </Menu.Item>
      <Menu.Item as={Link} to="/especies" onClick={onHide}>
        <Icon name="joget" />
        Especies
      </Menu.Item>
      <Menu.Item as={Link} to="/" onClick={onHide}>
        <Icon name="sign-out" />
        Cerrar Sesión
      </Menu.Item>
    </Sidebar>
  );
};

export default CustomSidebar;

