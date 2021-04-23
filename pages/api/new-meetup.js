import {MongoClient} from 'mongodb';

const handler = async (req, res)=>{
    try{
        if(req.method !== 'POST') return;
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        const db = client.db();
        const meetupColletion = db.collection('meetups');
        const result = await meetupColletion.insertOne(req.body);
        // console.log(result);
        client.close();
        return res.status(201).json({message: 'Meetup inserted successfully!'});
    } catch(err){
        return res.status(400).json({message: 'Something went wrong!'});
    }
}

export default handler;