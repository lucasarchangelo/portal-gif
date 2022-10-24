import Head from "next/head";
import Nav from "./Nav";

interface Props {
  children: any;
}

const Layout = (props: Props) => {
  return (
    <div>
      <Head>
        <title>Portal GIF</title>
      </Head>
      <Nav></Nav>
      {props.children}
    </div>
  );
};

export default Layout;
