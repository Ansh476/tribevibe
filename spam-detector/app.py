import re
import spacy
import pickle
from flask import Flask, request, jsonify
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
from flask_cors import CORS

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


app = Flask(__name__)
CORS(app)

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

if __name__ == '__main__':
    app.run(debug=True)
