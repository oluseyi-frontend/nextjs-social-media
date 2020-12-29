import '../styles/globals.css'
import Layout from './../components/Layout';
import 'semantic-ui-css/semantic.min.css'
import SocialMediaContext from '../components/Context';


function MyApp({ Component, pageProps }) {
  return (
    <SocialMediaContext>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SocialMediaContext>
  );
 
}

export default MyApp
