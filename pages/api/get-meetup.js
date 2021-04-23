import {MongoClient} from 'mongodb';

const handler = async (req, res)=>{
    try{
        if(req.method !== 'GET') return;
        const client = await MongoClient.connect(process.env.MONGODB_URL);
        const db = client.db();
        const meetupColletion = db.collection('meetups');
        const result = await meetupColletion.findOne(req.query.params);
        // console.log(result);
        client.close();
        return res.status(200).json({meetups: result});
    } catch(err){
        return res.status(400).json({error: 'Something went wrong!'});
    }
}

export default handler;