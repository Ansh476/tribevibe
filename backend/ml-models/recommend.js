const express = require("express");
const natural = require("natural");
const User = require("../models/usermodel");
const Community = require("../models/community");

async function getRecommendations(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) throw new Error("User not found");

        const joinedCommunities = new Set(user.communitiesJoined.map(id => id.toString()));
        const communities = await Community.find({ _id: { $nin: [...joinedCommunities] } });

        if (!communities.length) return { recommendations: [] };

        // ================= TF-IDF for Interest-Based Recommendations ================= //
        const tfidf = new natural.TfIdf();
        
        const communityDocs = communities.map(c => ({
            id: c._id.toString(),
            text: `${c.title.repeat(2)} ${c.description} ${c.tags.join(" ").repeat(4)}` 
        }));

        communityDocs.forEach(doc => tfidf.addDocument(doc.text));

        const userInterests = user.interest.join(" ");
        const scores = [];

        tfidf.tfidfs(userInterests, (i, measure) => {
            console.log(`Community: ${communityDocs[i].id} | Score: ${measure}`);
            scores.push({ id: communityDocs[i].id, score: measure });
        });

        //  **Filter out zero-score communities & sort**
        const MIN_SCORE_THRESHOLD = 0.1;
        let topInterestCommunities = scores
            .filter(s => s.score > MIN_SCORE_THRESHOLD)  
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)  // Take top 3 relevant ones
            .map(s => s.id);

        // Fetch and populate full community data for interest-based recommendations
        const interestBasedRecommendations = await Community.find({
            _id: { $in: topInterestCommunities }
        });

        // ================= Collaborative Filtering (Untouched) ================= //
        const similarUsersQuery = await User.find({
            _id: { $ne: userId },
            communitiesJoined: { $in: [...user.communitiesJoined] }
        });

        const allNewCommunities = new Set();
        similarUsersQuery.forEach(similarUser => {
            similarUser.communitiesJoined.forEach(communityId => {
                const communityIdStr = communityId.toString();
                if (!joinedCommunities.has(communityIdStr)) {
                    allNewCommunities.add(communityIdStr);
                }
            });
        });

        const shuffledCommunities = [...allNewCommunities].sort(() => 0.5 - Math.random());
        const selectedCommunityIds = shuffledCommunities.slice(0, 2);

        const collaborativeBasedRecommendations = await Community.find({
            _id: { $in: selectedCommunityIds }
        });

        return {
            interestBased: interestBasedRecommendations,
            collaborativeBased: collaborativeBasedRecommendations
        };

    } catch (error) {
        console.error("Error generating recommendations:", error);
        return { recommendations: [] };
    }
}


module.exports = { getRecommendations };