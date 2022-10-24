import React, { useEffect, useState } from "react";
import styles from "../styles/Index.module.css";

import { Button, Container, Grid, Image, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import { TEST_GIFS_HOME } from "../mock/database";
import Link from "next/link";
import { SolanaHelper } from "../helpers/solana_helper";

interface Props {}

const Index: React.FC<Props> = ({}) => {
  const [walletAddress, setWalletAddress] = useState(null);
  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window as any;
      if (solana) {
        if (solana.isPhantom) {
          console.log("Phantom wallet encontrada!");
          await SolanaHelper.Instance.init(solana);
          setWalletAddress(SolanaHelper.Instance.SolanaWallet.publicKey.toString());
        }
      } else {
        alert("Objeto Solana não encontrado! Instale a Phantom Wallet 👻");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {};

  const renderNotConnectedContainer = () => {
    return (
      <Button onClick={connectWallet} primary>
        Conecte sua carteira
      </Button>
    );
  };

  const renderConnectedContainer = () => {
    return (
      <Message floating>
        Você está conectado!{" "}
        <Link href="/gifs">
          <a>Começe aqui.</a>
        </Link>
      </Message>
    );
  };

  const renderLeftContent = () => {
    return (
      <div>
        <p className={styles.home_title}>Começe agora mesmo.</p>
        <p className={styles.home_text}>
          Compartilhe com seus amigos seus Gifs favoritos!
        </p>
        {walletAddress
          ? renderConnectedContainer()
          : renderNotConnectedContainer()}
      </div>
    );
  };

  const renderRightContent = () => {
    return (
      <Grid columns={3}>
        {TEST_GIFS_HOME.map((gif) => (
          <Grid.Column key={gif}>
            <Image
              alt={gif}
              src={gif}
              size="large"
              rounded
              className={styles.image_size}
            />
          </Grid.Column>
        ))}
      </Grid>
    );
  };

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    if (document.readyState === "complete") {
      onLoad();
    }
    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <Layout>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h1>Comunidade dos GIFs</h1>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row verticalAlign="middle">
            <Grid.Column width={7}>{renderLeftContent()}</Grid.Column>
            <Grid.Column width={9}>{renderRightContent()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Layout>
  );
};
export default Index;
