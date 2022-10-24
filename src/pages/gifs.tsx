import { useEffect, useState } from "react";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Label,
} from "semantic-ui-react";
import Layout from "../components/Layout";
import { SolanaHelper } from "../helpers/solana_helper";
import styles from "../styles/Gifs.module.css";

interface Props {}

const Gifs: React.FC<Props> = ({}) => {
  const [inputValue, setInputValue] = useState("");
  const [gifList, setGifList] = useState(Array<any>);

  useEffect(() => {
    if (SolanaHelper.Instance.SolanaWallet) {
      getGifList();
    }
  }, []);

  const onInputChange = (event: any) => {
    const { value } = event.target;
    setInputValue(value);
  };

  // const createGifList = async () => {
  //   await SolanaHelper.Instance.createGifAccount();
  //   await getGifList();
  // };

  const getGifList = async () => {
    try {
      const account = await SolanaHelper.Instance.getGifList();
      console.log("Conta obtida", account);
      setGifList(account.gifList as any);
    } catch (error) {
      console.log("Erro em getGifList", error);
      setGifList([]);
    }
  };

  const sendGif = async () => {
    if (inputValue.length > 0) {
      setInputValue("");
      console.log("Link do GIF:", inputValue);
      await SolanaHelper.Instance.addGif(inputValue);
      console.log("GIF enviado com sucesso para o programa", inputValue);
      await getGifList();
    } else {
      console.log("Input vazio. Tente novamente.");
    }
  };

  const voteGif = (index: number) => async () => {
    await SolanaHelper.Instance.voteGif(index);
    console.log("Votação enviada para o GIF", index);
    await getGifList();
  }

  const printCard = (gif_item: any, index: number) => {
    return (
      <Card fluid>
        <Image
          alt={gif_item.gifLink}
          src={gif_item.gifLink}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Meta>
            <span className="date">Added by</span>
          </Card.Meta>
          <Card.Description>
            <label className={styles.description_address}>
              {gif_item.userAddress.toString()}
            </label>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a onClick={voteGif(index)}>
            <Icon name="like" />
          </a>
          {gif_item.votes.toString()} Likes
        </Card.Content>
      </Card>
    );
  };

  return (
    <Layout>
      <Container>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h1>Adicione seus Gifs favoritos.</h1>
              <Form
                onSubmit={(event) => {
                  event.preventDefault();
                  sendGif();
                }}
              >
                <Grid>
                  <Grid.Row>
                    <Grid.Column width={13}>
                      <Form.Field>
                        <Input
                          value={inputValue}
                          onChange={onInputChange}
                          placeholder="Url do gif..."
                        />
                      </Form.Field>
                    </Grid.Column>
                    <Grid.Column width={3}>
                      <Button fluid type="submit">
                        Enviar
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                  <Grid.Row>
                    <Grid.Column>
                      <Grid columns={3}>
                        {gifList.map((item, index) => (
                          <Grid.Column key={index}>
                            {/* <Image
                              alt={item.gifLink}
                              src={item.gifLink}
                              fluid
                              rounded
                            /> */}
                            {printCard(item, index)}
                          </Grid.Column>
                        ))}
                      </Grid>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Gifs;
