import React from 'react';
import MeetupDetail from '../components/meetups/meetupDetail';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';

function MeetupDetails(props) {
    return (
        <React.Fragment>
            <Head>
                <title>{props.meetup.title}</title>
                <meta name="description" content="Browse a huge list of highly active react meetups" />
            </Head>
            <MeetupDetail
                title={props.meetup.title}
                image={props.meetup.image}
                description={props.meetup.description}
                address={props.meetup.address}
            />
        </React.Fragment>
    )
}

export async function getStaticPaths() { // neccessary in dynamic pages. To tell nextjs foe which pages we want pregenerated pages.
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        const db = client.db();
        const meetupColletion = db.collection('meetups');
        const result = await meetupColletion.find({}, { _id: 1 }).toArray();
        client.close();
        return {
            //paths is arrays contains the list of params (dynamic thing) for which we want the page to be prerendered. 
            paths: result.map(m => ({ params: { meetupid: m._id.toString() } })),
            fallback: 'blocking' // if false -- then this means our path array contains full list of params which we can have. so this means if user enter anything else that these values then nextjs will show 404 page. And if it is true then nextjs will try to build page for that value at run time dynamically on it's server. blocking is similar to true, the only difference is it serves only when the pregenerated page is ready when it doesn't find that page and true show empty page for mean time.
        }
    } catch (err) {
        console.log(err);
    }
}

export async function getStaticProps(context) {
    // console.log(context);
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        const db = client.db();
        const meetupColletion = db.collection('meetups');
        const result = await meetupColletion.findOne({ _id: ObjectId(context.params.meetupid) });
        client.close();
        return {
            revalidate: 10, // this will try in every 10s to request to a nextjs server or recreate this page internally if there are any changes and render new thing if something is changed.
            props: {
                meetup: {
                    image: result.image,
                    description: result.description,
                    address: result.address,
                    title: result.title,
                    id: result._id.toString()
                }
            }
        }
    } catch (err) {
        console.log(err);
        return {
            props: {
                meetup: '',
                error: err.message
            }
        }
    }
}

export default MeetupDetails;

// or create folder with this name and then index.js file in it works the same.