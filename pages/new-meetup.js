import React, { useState } from 'react';
import NewMeetupForm from '../components/meetups/NewMeetupForm';
import { useRouter } from 'next/router';
import Loader from '../components/ui/loader';
import Head from 'next/head';

function NewMeetup(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const addMeetupHandler = (m) => {
        setLoading(true);
        fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(m),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => {
            setLoading(false);
            router.push("/");
        }).catch(err => {
            console.log(err);
            setLoading(false);
        })
    }

    return (
        <React.Fragment>
            <Head>
                <title>Add New Meetup</title>
                <meta name="description" content="Browse a huge list of highly active react meetups" />
            </Head>
            {loading ? <Loader /> : <NewMeetupForm onAddMeetup={addMeetupHandler} />}
        </React.Fragment>
    )
}

export default NewMeetup;