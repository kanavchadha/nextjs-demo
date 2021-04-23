import '../styles/globals.css'
import Layout from '../components/layout/Layout';

function MyApp({ Component, pageProps }) { // this is root component loaded by nextjs
  // component is actual component to be rendered and pageProps is the props of that component.
  
  return <Layout> <Component {...pageProps} /> </Layout>
}

export default MyApp
