import flask
import functions

app = flask.Flask(__name__)

@app.after_request
def after_req(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@app.route("/")
def hello_world():
    return flask.jsonify(functions.get_file())


@app.route("/search/<code>", methods=['GET'])
def search(code):
    data = functions.get_file()

    print(code)

    student = {}

    try:
        student = data[code]
    except: 
        student = {
            "mens": "Student not found..."
        }

    return flask.jsonify(student)


if __name__ == "__main__":
    app.run(debug=True)    
