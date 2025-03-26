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
            text: `${c.title} ${c.description} ${c.tags.join(" ")}`
        }));

        communityDocs.forEach(doc => tfidf.addDocument(doc.text));

        const userInterests = user.interest.join(" ");
        const scores = [];

        tfidf.tfidfs(userInterests, (i, measure) => {
            scores.push({ id: communityDocs[i].id, score: measure });
        });

        // Sort and filter interest-based communities
        scores.sort((a, b) => b.score - a.score);
        let topInterestCommunities = scores.slice(0, 3).map(s => s.id);

        // Filter out already joined communities
        topInterestCommunities = topInterestCommunities.filter(id => !joinedCommunities.has(id));

        // Fetch and populate full community data for interest-based recommendations
        const interestBasedRecommendations = await Community.find({ 
            _id: { $in: topInterestCommunities } 
        });

        // ================= Collaborative Filtering ================= //
        const similarUsersQuery = await User.find({
            _id: { $ne: userId },
            communitiesJoined: { $in: [...user.communitiesJoined] }
        });

        // Collect all unique communities from similar users
        const allNewCommunities = new Set();
        similarUsersQuery.forEach(similarUser => {
            similarUser.communitiesJoined.forEach(communityId => {
                const communityIdStr = communityId.toString();
                if (!joinedCommunities.has(communityIdStr)) {
                    allNewCommunities.add(communityIdStr);
                }
            });
        });

        // Convert to array and shuffle to get random recommendations on each reload
        const shuffledCommunities = [...allNewCommunities].sort(() => 0.5 - Math.random());
        const selectedCommunityIds = shuffledCommunities.slice(0, 2);

        // Fetch recommended collaborative communities
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