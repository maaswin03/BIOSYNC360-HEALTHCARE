from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.svm import SVC
import statistics

final_rf_model = pickle.load(open("final_rf_model.pkl", "rb"))
final_nb_model = pickle.load(open("final_nb_model.pkl", "rb"))
final_svm_model = pickle.load(open("final_svm_model.pkl", "rb"))
data_dict = pickle.load(open("data_dict.pkl", "rb"))

app = Flask(__name__)
CORS(app)

def calculate_confidence(predictions, final_prediction):
    total = len(predictions)
    matches = predictions.count(final_prediction)
    confidence = matches / total
    return round(confidence * 100, 2)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        symptoms = request.json.get("symptoms", [])
        print("Received Symptoms:", symptoms)

        input_data = [0] * len(data_dict["symptom_index"])
        for symptom in symptoms:
            if symptom in data_dict["symptom_index"]:
                index = data_dict["symptom_index"][symptom]
                input_data[index] = 1
            else:
                error_message = f"Symptom '{symptom}' not found in symptom index."
                print(error_message)
                return jsonify({"error": error_message}), 400

        input_data = np.array(input_data).reshape(1, -1)
        print("Processed Input Data:", input_data)

        # Get predictions
        rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[0]]
        nb_prediction = data_dict["predictions_classes"][final_nb_model.predict(input_data)[0]]
        svm_prediction = data_dict["predictions_classes"][final_svm_model.predict(input_data)[0]]
        
        # Get prediction probabilities if available
        try:
            rf_proba = final_rf_model.predict_proba(input_data)[0].max()
            nb_proba = final_nb_model.predict_proba(input_data)[0].max()
            svm_proba = final_svm_model.predict_proba(input_data)[0].max()
        except AttributeError:
            # If models don't support predict_proba, use default confidence
            rf_proba = 0.85
            nb_proba = 0.80
            svm_proba = 0.75

        final_prediction = statistics.mode([rf_prediction, nb_prediction, svm_prediction])
        
        # Calculate overall confidence
        predictions = [rf_prediction, nb_prediction, svm_prediction]
        overall_confidence = calculate_confidence(predictions, final_prediction)

        return jsonify({
            "predictions": {
                "disease-1": {
                    "disease": rf_prediction,
                    "confidence": round(rf_proba * 100, 2)
                },
                "disease-2": {
                    "disease": nb_prediction,
                    "confidence": round(nb_proba * 100, 2)
                },
                "disease-3": {
                    "disease": svm_prediction,
                    "confidence": round(svm_proba * 100, 2)
                }
            },
            "final_prediction": {
                "disease": final_prediction,
                "confidence": overall_confidence,
                "agreement": f"{predictions.count(final_prediction)}/3 models agree"
            },
            "symptoms_used": symptoms
        })

    except Exception as e:
        import traceback
        print("Error Traceback:", traceback.format_exc())
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True)