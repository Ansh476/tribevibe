const { getRecommendations } = require('../ml-models/recommend');

exports.recommendForUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const recommendations = await getRecommendations(userId);

        res.json({ recommendations });
    } catch (error) {
        res.status(500).json({ message: "Error fetching recommendations" });
    }
};
