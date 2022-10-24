import React, { useEffect, useState } from "react";
import styles from "./styles/Navbar.module.css";

import { Menu } from "semantic-ui-react";
import Link from "next/link";
import { SolanaHelper, Web3Object } from "../helpers/solana_helper";

const Nav = () => {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    SolanaHelper.Instance.web3Objects.subscribe((result: Web3Object) => {
      setConnected(result.connected);
    });
  }, []);

  return (
    <Menu className={styles.shadow_nav}>
      <Link href="/">
        <Menu.Item header>Portal GIF</Menu.Item>
      </Link>
      <Menu.Menu position="right">
        <Menu.Item
          className={
            connected ? styles.text_color_menu_on : styles.text_color_menu_off
          }
          name={connected ? "Conectado" : "Desconectado"}
        />
      </Menu.Menu>
    </Menu>
  );
};

export default Nav;
