import Head from "next/head";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>DafHive</title>
        <link rel="icon" href="/logo.ico" />
      </Head>

      <div className="container">
        <main>{children}</main>

        <footer>
          <code>
            Made with ♥ by{" "}
            <a href="https://rishon.systems">rishon.systems</a>{" "}
          </code>
        </footer>
      </div>
    </div>
  );
};

export default Layout;
