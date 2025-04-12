from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pickle


final_rf_model = pickle.load(open("final_rf_model.pkl", "rb"))
data_dict = pickle.load(open("data_dict.pkl", "rb"))

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])
def predict():
    try:
        symptoms = request.json.get("symptoms", [])

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

        rf_prediction = data_dict["predictions_classes"][final_rf_model.predict(input_data)[0]]
        print("Random Forest Prediction:", rf_prediction)

        return jsonify({
            "prediction": rf_prediction
        })

    except Exception as e:
        import traceback
        print("Error Traceback:", traceback.format_exc())
        return jsonify({"error": f"An unexpected error occurred: {str(e)}"}), 500


if __name__ == '__main__':
    app.run(debug=True)
