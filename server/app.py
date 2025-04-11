from flask import Flask, request, jsonify
from flask_cors import CORS
import pymongo
from datetime import datetime
from dotenv import load_dotenv
import os
load_dotenv()


connection_url = os.getenv('MONGO_URI')

app = Flask(__name__)
CORS(app)

client = pymongo.MongoClient(connection_url)
db = client.get_database('BioSync')

temperature = db.Temperature
ecg = db.EcgValue
bloodpressure = db.BloodPressure
heart = db.HeartRate
pulse = db.PulseRate
respiratory = db.RespiratoryRate
spo2_collection = db.SpO2

@app.route('/api/data22', methods=['POST'])
def upsert_sensor_data():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        username = data.get("username")
        current_temperature = data.get("currenttemperature")
        current_ecg = data.get("currentecg")
        current_heartRate = data.get("currentheartRate")
        current_pulseRate = data.get("currentpulseRate")
        current_sp02 = data.get("currentsp02")
        current_systolic = data.get("currentsystolic")
        current_diastolic = data.get("currentdiastolic")
        current_respiratoryRate = data.get("currentrespiratoryRate")
        current_time = datetime.now().isoformat() + "Z"

        if not username:
            return jsonify({"error": "Username is required"}), 400


        existing_temp = temperature.find_one({"username": username})
        existing_user1 = ecg.find_one({"username": username})
        existing_user2 = spo2_collection.find_one({"username": username})
        existing_user3 = heart.find_one({"username": username})
        existing_user4 = pulse.find_one({"username": username})
        existing_user5 = respiratory.find_one({"username": username})
        existing_user6 = bloodpressure.find_one({"username": username})
        
        if existing_temp:
            update_fields = {
                "prev6Time": existing_temp.get("prev5Time"),
                "prev6Temperature": existing_temp.get("prev5Temperature"),
                "prev5Time": existing_temp.get("prev4Time"),
                "prev5Temperature": existing_temp.get("prev4Temperature"),
                "prev4Time": existing_temp.get("prev3Time"),
                "prev4Temperature": existing_temp.get("prev3Temperature"),
                "prev3Time": existing_temp.get("prev2Time"),
                "prev3Temperature": existing_temp.get("prev2Temperature"),
                "prev2Time": existing_temp.get("prev1Time"),
                "prev2Temperature": existing_temp.get("prev1Temperature"),
                "prev1Time": existing_temp.get("currTime"),
                "prev1Temperature": existing_temp.get("currTemperature"),
                "currTime": current_time,
                "currTemperature": current_temperature
            }
            temperature.update_one({"username": username}, {"$set": update_fields})
        else:
            new_document = {
                "username": username,
                "currTime": current_time,
                "currTemperature": current_temperature,
                "prev1Time": None,
                "prev1Temperature": None,
                "prev2Time": None,
                "prev2Temperature": None,
                "prev3Time": None,
                "prev3Temperature": None,
                "prev4Time": None,
                "prev4Temperature": None,
                "prev5Time": None,
                "prev5Temperature": None,
                "prev6Time": None,
                "prev6Temperature": None
            }
            temperature.insert_one(new_document)
        
        if existing_user1:
            update_fields = {
                "prev23Time": existing_user1.get("prev22Time"),
                "prev23ECG": existing_user1.get("prev22ECG"),
                "prev22Time": existing_user1.get("prev21Time"),
                "prev22ECG": existing_user1.get("prev21ECG"),
                "prev21Time": existing_user1.get("prev20Time"),
                "prev21ECG": existing_user1.get("prev20ECG"),
                "prev20Time": existing_user1.get("prev19Time"),
                "prev20ECG": existing_user1.get("prev19ECG"),
                "prev19Time": existing_user1.get("prev18Time"),
                "prev19ECG": existing_user1.get("prev18ECG"),
                "prev18Time": existing_user1.get("prev17Time"),
                "prev18ECG": existing_user1.get("prev17ECG"),
                "prev17Time": existing_user1.get("prev16Time"),
                "prev17ECG": existing_user1.get("prev16ECG"),
                "prev16Time": existing_user1.get("prev15Time"),
                "prev16ECG": existing_user1.get("prev15ECG"),
                "prev15Time": existing_user1.get("prev14Time"),
                "prev15ECG": existing_user1.get("prev14ECG"),
                "prev14Time": existing_user1.get("prev13Time"),
                "prev14ECG": existing_user1.get("prev13ECG"),
                "prev13Time": existing_user1.get("prev12Time"),
                "prev13ECG": existing_user1.get("prev12ECG"),
                "prev12Time": existing_user1.get("prev11Time"),
                "prev12ECG": existing_user1.get("prev11ECG"),
                "prev11Time": existing_user1.get("prev10Time"),
                "prev11ECG": existing_user1.get("prev10ECG"),
                "prev10Time": existing_user1.get("prev9Time"),
                "prev10ECG": existing_user1.get("prev9ECG"),
                "prev9Time": existing_user1.get("prev8Time"),
                "prev9ECG": existing_user1.get("prev8ECG"),
                "prev8Time": existing_user1.get("prev7Time"),
                "prev8ECG": existing_user1.get("prev7ECG"),
                "prev7Time": existing_user1.get("prev6Time"),
                "prev7ECG": existing_user1.get("prev6ECG"),
                "prev6Time": existing_user1.get("prev5Time"),
                "prev6ECG": existing_user1.get("prev5ECG"),
                "prev5Time": existing_user1.get("prev4Time"),
                "prev5ECG": existing_user1.get("prev4ECG"),
                "prev4Time": existing_user1.get("prev3Time"),
                "prev4ECG": existing_user1.get("prev3ECG"),
                "prev3Time": existing_user1.get("prev2Time"),
                "prev3ECG": existing_user1.get("prev2ECG"),
                "prev2Time": existing_user1.get("prev1Time"),
                "prev2ECG": existing_user1.get("prev1ECG"),
                "prev1Time": existing_user1.get("currTime"),
                "prev1ECG": existing_user1.get("currECG"),
                "currTime": current_time,  # Add Z to indicate UTC
                "currECG": current_ecg
            }
            ecg.update_one({"username": username}, {"$set": update_fields})
            print("ECG data updated")
        else:
            new_document = {
                "username": username,
                "currTime": current_time,
                "currECG": current_ecg,
                "prev1Time": None,
                "prev1ECG": None,
                "prev2Time": None,
                "prev2ECG": None,
                "prev3Time": None,
                "prev3ECG": None,
                "prev4Time": None,
                "prev4ECG": None,
                "prev5Time": None,
                "prev5ECG": None,
                "prev6Time": None,
                "prev6ECG": None,
                "prev7Time": None,
                "prev7ECG": None,
                "prev8Time": None,
                "prev8ECG": None,
                "prev9Time": None,
                "prev9ECG": None,
                "prev10Time": None,
                "prev10ECG": None,
                "prev11Time": None,
                "prev11ECG": None,
                "prev12Time": None,
                "prev12ECG": None,
                "prev13Time": None,
                "prev13ECG": None,
                "prev14Time": None,
                "prev14ECG": None,
                "prev15Time": None,
                "prev15ECG": None,
                "prev16Time": None,
                "prev16ECG": None,
                "prev17Time": None,
                "prev17ECG": None,
                "prev18Time": None,
                "prev18ECG": None,
                "prev19Time": None,
                "prev19ECG": None,
                "prev20Time": None,
                "prev20ECG": None,
                "prev21Time": None,
                "prev21ECG": None,
                "prev22Time": None,
                "prev22ECG": None,
                "prev23Time": None,
                "prev23ECG": None
            }
            ecg.insert_one(new_document)
            print("New ECG data inserted")

        if existing_user2:
            update_fields = {
                "prev6Time": existing_user2.get("prev5Time"),
                "prev6SpO2": existing_user2.get("prev5SpO2"),
                "prev5Time": existing_user2.get("prev4Time"),
                "prev5SpO2": existing_user2.get("prev4SpO2"),
                "prev4Time": existing_user2.get("prev3Time"),
                "prev4SpO2": existing_user2.get("prev3SpO2"),
                "prev3Time": existing_user2.get("prev2Time"),
                "prev3SpO2": existing_user2.get("prev2SpO2"),
                "prev2Time": existing_user2.get("prev1Time"),
                "prev2SpO2": existing_user2.get("prev1SpO2"),
                "prev1Time": existing_user2.get("currTime"),
                "prev1SpO2": existing_user2.get("currSpO2"),
                "currTime": current_time,  # Add Z to indicate UTC
                "currSpO2": current_sp02
            }
            spo2_collection.update_one({"username": username}, {"$set": update_fields})
            print("SpO2 data updated")
        else:
            new_document = {
                "username": username,
                "currTime": current_time,
                "currSpO2": current_sp02,
                "prev1Time": None,
                "prev1SpO2": None,
                "prev2Time": None,
                "prev2SpO2": None,
                "prev3Time": None,
                "prev3SpO2": None,
                "prev4Time": None,
                "prev4SpO2": None,
                "prev5Time": None,
                "prev5SpO2": None,
                "prev6Time": None,
                "prev6SpO2": None
            }
            spo2_collection.insert_one(new_document)
            print("New SpO2 data inserted")

        if existing_user3:
            update_fields = {
                "prev6Time": existing_user3.get("prev5Time"),
                "prev6HeartRate": existing_user3.get("prev5HeartRate"),
                "prev5Time": existing_user3.get("prev4Time"),
                "prev5HeartRate": existing_user3.get("prev4HeartRate"),
                "prev4Time": existing_user3.get("prev3Time"),
                "prev4HeartRate": existing_user3.get("prev3HeartRate"),
                "prev3Time": existing_user3.get("prev2Time"),
                "prev3HeartRate": existing_user3.get("prev2HeartRate"),
                "prev2Time": existing_user3.get("prev1Time"),
                "prev2HeartRate": existing_user3.get("prev1HeartRate"),
                "prev1Time": existing_user3.get("currTime"),
                "prev1HeartRate": existing_user3.get("currHeartRate"),
                "currTime":current_time,
                "currHeartRate": current_heartRate
            }
            heart.update_one({"username": username}, {"$set": update_fields})
            print("Heart Rate data updated")
        else:
            new_document = {
                "username": username,
                "currTime": current_time,
                "currHeartRate": current_heartRate,
                "prev1Time": None,
                "prev1HeartRate": None,
                "prev2Time": None,
                "prev2HeartRate": None,
                "prev3Time": None,
                "prev3HeartRate": None,
                "prev4Time": None,
                "prev4HeartRate": None,
                "prev5Time": None,
                "prev5HeartRate": None,
                "prev6Time": None,
                "prev6HeartRate": None
            }
            heart.insert_one(new_document)
            print("New Heart Rate data inserted")


        if existing_user4:
            update_fields = {
                "prev6Time": existing_user4.get("prev5Time"),
                "prev6PulseRate": existing_user4.get("prev5PulseRate"),
                "prev5Time": existing_user4.get("prev4Time"),
                "prev5PulseRate": existing_user4.get("prev4PulseRate"),
                "prev4Time": existing_user4.get("prev3Time"),
                "prev4PulseRate": existing_user4.get("prev3PulseRate"),
                "prev3Time": existing_user4.get("prev2Time"),
                "prev3PulseRate": existing_user4.get("prev2PulseRate"),
                "prev2Time": existing_user4.get("prev1Time"),
                "prev2PulseRate": existing_user4.get("prev1PulseRate"),
                "prev1Time": existing_user4.get("currTime"),
                "prev1PulseRate": existing_user4.get("currPulseRate"),
                "currTime": current_time,
                "currPulseRate": current_pulseRate
            }
            pulse.update_one({"username": username}, {"$set": update_fields})
            print("Pulse Rate data updated")
        else:
            new_document = {
                "username": username,
                "currTime": current_time,
                "currPulseRate": current_pulseRate,
                "prev1Time": None,
                "prev1PulseRate": None,
                "prev2Time": None,
                "prev2PulseRate": None,
                "prev3Time": None,
                "prev3PulseRate": None,
                "prev4Time": None,
                "prev4PulseRate": None,
                "prev5Time": None,
                "prev5PulseRate": None,
                "prev6Time": None,
                "prev6PulseRate": None
            }
            pulse.insert_one(new_document)
            print("New Pulse Rate data inserted")


        if existing_user5:
            update_fields = {
                "prev6Time": existing_user5.get("prev5Time"),
                "prev6RespiratoryRate": existing_user5.get("prev5RespiratoryRate"),
                "prev5Time": existing_user5.get("prev4Time"),
                "prev5RespiratoryRate": existing_user5.get("prev4RespiratoryRate"),
                "prev4Time": existing_user5.get("prev3Time"),
                "prev4RespiratoryRate": existing_user5.get("prev3RespiratoryRate"),
                "prev3Time": existing_user5.get("prev2Time"),
                "prev3RespiratoryRate": existing_user5.get("prev2RespiratoryRate"),
                "prev2Time": existing_user5.get("prev1Time"),
                "prev2RespiratoryRate": existing_user5.get("prev1RespiratoryRate"),
                "prev1Time": existing_user5.get("currTime"),
                "prev1RespiratoryRate": existing_user5.get("currRespiratoryRate"),
                "currTime": current_time,
                "currRespiratoryRate": current_respiratoryRate
            }
            respiratory.update_one({"username": username}, {"$set": update_fields})
            print("Respiratory Rate data updated")
        else:
            new_document = {
                "username": username,
                "currTime": current_time,
                "currRespiratoryRate": current_respiratoryRate,
                "prev1Time": None,
                "prev1RespiratoryRate": None,
                "prev2Time": None,
                "prev2RespiratoryRate": None,
                "prev3Time": None,
                "prev3RespiratoryRate": None,
                "prev4Time": None,
                "prev4RespiratoryRate": None,
                "prev5Time": None,
                "prev5RespiratoryRate": None,
                "prev6Time": None,
                "prev6RespiratoryRate": None
            }
            respiratory.insert_one(new_document)
            print("New Respiratory Rate data inserted")

        # For Blood Pressure (existing_user6)
        if existing_user6:
            update_fields = {
                "prev6Time": existing_user6.get("prev5Time"),
                "prev6Systolic": existing_user6.get("prev5Systolic"),
                "prev6Diastolic": existing_user6.get("prev5Diastolic"),
                "prev5Time": existing_user6.get("prev4Time"),
                "prev5Systolic": existing_user6.get("prev4Systolic"),
                "prev5Diastolic": existing_user6.get("prev4Diastolic"),
                "prev4Time": existing_user6.get("prev3Time"),
                "prev4Systolic": existing_user6.get("prev3Systolic"),
                "prev4Diastolic": existing_user6.get("prev3Diastolic"),
                "prev3Time": existing_user6.get("prev2Time"),
                "prev3Systolic": existing_user6.get("prev2Systolic"),
                "prev3Diastolic": existing_user6.get("prev2Diastolic"),
                "prev2Time": existing_user6.get("prev1Time"),
                "prev2Systolic": existing_user6.get("prev1Systolic"),
                "prev2Diastolic": existing_user6.get("prev1Diastolic"),
                "prev1Time": existing_user6.get("currTime"),
                "prev1Systolic": existing_user6.get("currSystolic"),
                "prev1Diastolic": existing_user6.get("currDiastolic"),
                "currTime": current_time,
                "currSystolic": current_systolic,
                "currDiastolic": current_diastolic
            }
            bloodpressure.update_one({"username": username}, {"$set": update_fields})
            print("Blood Pressure data updated")
        else:
            new_document = {
                "username": username,
                "currTime": current_time,
                "currSystolic": current_systolic,
                "currDiastolic": current_diastolic,
                "prev1Time": None,
                "prev1Systolic": None,
                "prev1Diastolic": None,
                "prev2Time": None,
                "prev2Systolic": None,
                "prev2Diastolic": None,
                "prev3Time": None,
                "prev3Systolic": None,
                "prev3Diastolic": None,
                "prev4Time": None,
                "prev4Systolic": None,
                "prev4Diastolic": None,
                "prev5Time": None,
                "prev5Systolic": None,
                "prev5Diastolic": None,
                "prev6Time": None,
                "prev6Systolic": None,
                "prev6Diastolic": None
            }
            bloodpressure.insert_one(new_document)
            print("New Blood Pressure data inserted")
    
        return jsonify({"message": "User data inserted"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)



