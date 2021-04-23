import React from 'react';
import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb'; // import statement which are only be used in server side code are not include in client side build bundle. this reduces the bundle size as well as keep our code secure.
import Head from 'next/head';

function HomePage(props) {
    return (
        <React.Fragment>
            <Head>
                <title>Meetups</title>
                <meta name="description" content="Browse a huge list of highly active react meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </React.Fragment>
    )
}

// if this function is exported in page component then nextjs will execute this before the component loaded and prepare props for the component.
// The code in this will only run on next server not on client machine so we can securely do any task like connecting to db etc.
// always we have to return object and set props property so that we can retrieve data via props. 
export async function getStaticProps() {
    // we can also use fetch here !!! In nextjs projects we can use browser fetch api in server side code area.
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        const db = client.db();
        const meetupColletion = db.collection('meetups');
        const result = await meetupColletion.find().toArray();
        const meetups = result.map(m => ({
            title: m.title,
            address: m.address,
            image: m.image,
            description: m.description,
            id: m._id.toString()
        }))
        // console.log(result);
        client.close();
        return {
            revalidate: 1000000, // this will try in every 10s to request to a nextjs server or recreate this page internally if there are any changes and render new thing if something is changed.
            props: {
                meetups: meetups
            }
        }
    } catch (err) {
        console.log(err);
        return {
            revalidate: 1000000,
            props: {
                meetups: [],
                error: err.message
            }
        }
    }
}

// This is also run on nextjs server and not on client side, before component loaded. But this will run on every incoming request. Here it always pregenerate the page before loading like traditional websites.
// export const getServerSideProps = async (context)=>{
//     const req = context.req; // we have access to request obj, headers etc. so we can do work like checking authentication etc. before rendering of component.
//     const res = context.res;
//     return {
//         props: {
//             meetups: meetups
//         }
//     }
// }

// getStaticProps, getStaticPaths, getServerSideProps are server side methods in nextjs so these funcctions are not included in client side code or bundle (during build time).

export default HomePage;