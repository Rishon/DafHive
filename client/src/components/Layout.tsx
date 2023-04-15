import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>Hastebin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{children}</main>

      <footer>
        <hr />
        <code>
          Made with ♥ by <a href="https://rishon.systems">rishon.systems</a>{" "}
        </code>
      </footer>
    </div>
  );
};

export default Layout;
