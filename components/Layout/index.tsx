import type { NextPage } from 'next';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';

const Layout: NextPage = ({children}) => {
    return (
      <>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </>
  );
};

export default Layout;