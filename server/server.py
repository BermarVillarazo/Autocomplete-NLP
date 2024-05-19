import autocompleter
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/autocomplete', methods=['GET'])

def autocomplete():

    """ Generate autocompletions given the query 'q' """
    
    q = request.args.get('q')
    completions = my_autocompleter.generate_completions(q, data_clean, model, tdidf_matrice)
    return jsonify({"Completions": completions})

if __name__ == "__main__":
    my_autocompleter = autocompleter.Autocompleter()
    data_orig = my_autocompleter.import_json("sample_conversations.json")
    data_clean = my_autocompleter.process_data(data_orig)
    model, tdidf_matrice = my_autocompleter.calc_matrice(data_clean)
    print("RUNNINGGGGGGGGGGGGGGGGG...")

    app.run(debug=True, port=8080)


# FOR TESTING PURPOSES
# from flask import Flask, jsonify, request

# app = Flask(__name__)

# @app.route('/autocomplete', methods=['GET'])
# def return_autocomplete():
#     return jsonify({"message": "Hello, World!"})
#     # return jsonify({"Completions": ["apple", "banana", "cherry"]})

# if __name__ == "__main__":
#     app.run(host="127.0.0.1", port=5000)