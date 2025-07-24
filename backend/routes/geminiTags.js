const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/suggest-tags', async (req, res) => {
    const { title, description } = req.body;

    if (!title && !description) {
        return res.status(400).json({ error: 'Title or description is required' });
    }

    try {
        const prompt = `
Generate exactly 5 short, relevant tags (1-2 words each) for this community post.
Return ONLY the tags separated by commas with no additional text, explanation, formatting, or symbols.

Title: "${title}"
Description: "${description}"

Example response format: Tag1, Tag2, Tag3, Tag4, Tag5
`;

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

        const geminiRes = await axios.post(
            geminiUrl,
            {
                contents: [
                    {
                        parts: [{ text: prompt }]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const text = geminiRes.data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        console.log('Raw text from Gemini:', text);

        // Clean up the text - remove any formatting symbols, extra spaces, and new lines
        let cleanText = text
            .replace(/\*/g, '') // Remove asterisks
            .replace(/\n/g, ', ') // Replace newlines with commas
            .replace(/^[^a-zA-Z0-9]+/, '') // Remove any non-alphanumeric chars at the beginning
            .replace(/\s*,\s*/g, ', ') // Standardize spaces around commas
            .trim();

        // Check if there's any explanatory text and remove it
        if (cleanText.toLowerCase().includes('here are') ||
            cleanText.toLowerCase().includes('based on')) {
            const parts = cleanText.split(/[:.]/);
            if (parts.length > 1) {
                cleanText = parts[parts.length - 1].trim();
            }
        }

        const tagArray = cleanText
            .split(',')
            .map(tag => tag.trim())
            .filter(tag => tag && !tag.toLowerCase().includes('tag'));

        console.log('Extracted tags:', tagArray);
        res.json({ tags: tagArray });
    } catch (error) {
        console.error('Gemini tag suggestion error:', error.message);

        if (error.response) {
            console.error('Error response data:', error.response.data);
            console.error('Error response status:', error.response.status);
        }

        res.status(500).json({
            error: 'Failed to generate tag suggestions',
            details: error.response?.data || error.message
        });
    }
});

module.exports = router;
