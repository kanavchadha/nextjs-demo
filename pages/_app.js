import '../styles/globals.css'
import Layout from '../components/layout/Layout';
import NProgress from 'nprogress'; //nprogress module
import 'nprogress/nprogress.css';
import Router from 'next/router';

NProgress.configure({
  template: "<div class='bar' role='bar'><div class='peg'></div></div>",
});
//Binding events. 
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

function MyApp({ Component, pageProps }) { // this is root component loaded by nextjs
  // component is actual component to be rendered and pageProps is the props of that component.
  
  return <Layout> <Component {...pageProps} /> </Layout>
}

export default MyApp
