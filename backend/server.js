const express = require('express')
const {ObjectId} = require('mongodb'); 
const {connectToDb, getDb} = require('./db')

const app = express()

let db

connectToDb((err) =>{
    if(!err){
        app.listen(3000)
        db = getDb()
    }

})


app.get('/communities', (req, res) =>{
    let communities = []

    db.collection('communities').find().sort({title: 1})
      .forEach(community => communities.push(community))
      .then(() => {
        res.status(200).json(communities)
      })
      .catch(() => {
        res.status(500).json({error: 'Could not fetch data'})
      })
})

// fetch a particular community using it's id

app.get('/communities/:id', (req, res) =>{ 
    db.collection('communities').findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({error: "could not fetch"})
      })
})

// fetch all announcements for a particular community using it's id

app.get('/communities/:id/announcements', (req, res) =>{ 
    db.collection('communities').findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc.announcements)
      })
      .catch(err => {
        res.status(500).json({error: "could not fetch"})
      })
})

// all users for a community

app.get('/communities/:id/users', (req, res) => {
    const communityId = req.params.id;

    db.collection('communities')
      .findOne({_id: new ObjectId(req.params.id)})
      .then(doc => {
        res.status(200).json(doc.joinedUsers)
      })
      .catch(err => {
        res.status(500).json({error: "could not fetch"})
      })
});

// fetch all community titles joined by a user

app.get('/users/:id/communities', async (req, res) => {
    const userId = req.params.id;

    try {
        
        const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        
        const communityIds = user.communitiesJoined;

        if (!communityIds || communityIds.length === 0) {
            return res.status(200).json([]); // No communities joined
        }

      
        const communityTitles = [];
        for (const id of communityIds) {
            const community = await db.collection('communities').findOne({ _id: new ObjectId(id) });
            if (community) {
                communityTitles.push(community.title);
            }
        }

        res.status(200).json(communityTitles);
    } catch (err) {
        console.error(err); 
        res.status(500).json({ error: 'Could not fetch communities' });
    }
});

