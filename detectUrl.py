from sklearn.feature_extraction.text import TfidfVectorizer
import joblib
import sys
import json

def makeTokens(f):
    tkns_BySlash = str(f.encode('utf-8')).split('/')
    total_Tokens = []
    for i in tkns_BySlash:
        tokens = str(i).split('-')
        tkns_ByDot = []
        for j in range(0,len(tokens)):
            temp_Tokens = str(tokens[j]).split('.')
            tkns_ByDot = tkns_ByDot + temp_Tokens
        total_Tokens = total_Tokens + tokens + tkns_ByDot
    total_Tokens = list(set(total_Tokens))
    if 'com' in total_Tokens:
        total_Tokens.remove('com')
    return total_Tokens

def detectUrl(data):
    try:
        url_list = json.loads(data)
        _model = joblib.load('./model/_trainedModel.pkl')
        _vectorizer = joblib.load('./model/_vectorizer.pkl')
        X_predict = _vectorizer.transform(url_list)
        New_predict = _model.predict(X_predict)
        result=New_predict.tolist()
        print(json.dumps(result))
    except Exception as e:
        print("Python script error:", e)

data = sys.stdin.read()
detectUrl(data)