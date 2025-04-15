import re
import spacy
import pickle
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
from flask_cors import CORS
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity

nlp = spacy.load("en_core_web_sm")

# stop_words = set(ENGLISH_STOP_WORDS)

stop_words = {
    'i', 'me', 'my', 'myself', 'we', 'our', 'ourselves', 'you', 'your', 'yours', 'yourself', 
    'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'they', 
    'them', 'their', 'theirs', 'what', 'which', 'who', 'whom', 'this', 'that', 'these', 
    'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 
    'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 
    'because', 'as', 'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'between', 
    'into', 'through', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 
    'in', 'out', 'on', 'off', 'over', 'under', 'again', 'further', 'then', 'once', 'here', 
    'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both', 'each', 'few', 'more', 
    'most', 'some', 'such', 'nor', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 
    'can', 'will', 'just', 'don', "don't", 'should', 'now', 'let'
}
stop_words = set(stop_words)

whitelist_phrases = {"awesome community", "great community", "love this community"}

positive_words = {"awesome", "great", "love", "fantastic", "amazing", "wonderful", "excellent", "friendly", "community"}

def clean_text(text):
    text = text.lower()
    text = re.sub(r"http\S+|www\S+|https\S+", '', text, flags=re.MULTILINE) 
    text = re.sub(r'\@\w+|\#', '', text)  
    text = re.sub(r'[^\x00-\x7F]+', '', text) 
    text = re.sub(r'[^a-zA-Z0-9\s]', '', text)  
    text = re.sub(r'\s+', ' ', text).strip()  
    text = re.sub(r'\b\d{5,}\b', '', text) 

    if any(phrase in text for phrase in whitelist_phrases):
        return "Not Spam"

    words = nlp(text)
    words = [word.lemma_ for word in words]
    words = [word for word in words if word not in stop_words and word not in positive_words]

    if all(word in positive_words for word in words) and len(words) <= 3:
        return "Not Spam"

    return ' '.join(words)

# with open('hybrid_recommender_model.pkl', 'rb') as f:
#     knn = pickle.load(f)

with open('tfidf_vectorizer.pkl', 'rb') as f:
    tfidf_vectorizer = pickle.load(f)

communities_df = pd.read_csv('communities_df.csv')
communities_df['combined'] = communities_df['description'].astype(str) + ' ' + communities_df['categories'].astype(str)
tfidf_matrix = tfidf_vectorizer.transform(communities_df['combined'])

app = Flask(__name__)
CORS(app)

def vectorize_user_interests(user_interests):
    return tfidf_vectorizer.transform([user_interests])

def get_content_based_recommendations(user_interests, top_n=5):
    user_vector = vectorize_user_interests(user_interests)
    similarity_scores = cosine_similarity(user_vector, tfidf_matrix)
    similarity_df = pd.DataFrame(similarity_scores.T, columns=['similarity_score'])
    similarity_df['community_id'] = communities_df['Id']
    similarity_df = similarity_df.sort_values(by='similarity_score', ascending=False)
    return similarity_df.head(top_n)

with open("spam_detection_model.pkl", "rb") as file:
    model = pickle.load(file)

@app.route('/')
def home():
    return "welcome to spam detection home"    

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json 
    if "text" not in data:
        return jsonify({"error": "Missing 'text' field"}), 400  

    cleaned_text = clean_text(data["text"])  
    print(f"Cleaned text: {cleaned_text}") 

    if cleaned_text == "Not Spam":
        return jsonify({"spam": False}) 
    
    prediction = model.predict([cleaned_text])  

    return jsonify({"spam": bool(prediction[0])}) 


@app.route('/recommend-tags', methods=['POST'])
def recommend_tags():
    data = request.get_json()
    title = data.get('title', '')
    description = data.get('description', '')

    if not title and not description:
        return jsonify({'error': 'Missing title or description'}), 400

    combined_input = title + ' ' + description
    input_vector = tfidf_vectorizer.transform([combined_input])
    similarity_scores = cosine_similarity(input_vector, tfidf_matrix).flatten()

    top_indices = similarity_scores.argsort()[-5:][::-1]
    top_categories = communities_df.iloc[top_indices]['categories']

    tags = []
    for cats in top_categories:
        tags.extend([c.strip() for c in cats.split(',') if c.strip()])

    from collections import Counter
    most_common_tags = [tag for tag, _ in Counter(tags).most_common(5)]

    return jsonify({'recommended_tags': most_common_tags})

if __name__ == '__main__':
    app.run(debug=True)
