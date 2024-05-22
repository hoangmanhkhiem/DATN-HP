from flask import Flask, render_template, request, send_from_directory
import src.remote.restart as restart
import src.remote.stop as stop
import src.remote.update as update

app = Flask(__name__, template_folder='template')


@app.route('/')
def index():
    return render_template('scanner.html')


@app.route('/forms')
def forms():
    return render_template('forms.html')


@app.route('/manager')
def manager():
    return render_template('manager.html')


@app.route('/details')
def details():
    return render_template('details.html')


@app.route('/src/data/<path:path>', methods=['GET'])
def get_data(path):
    return send_from_directory('src/data', path)


# Reset
@app.route('/src/remote/restart.py', methods=['PUT'])
def restart():
    id = request.json['id']
    room = request.json['room']
    # restart.restart_vm_by_id(request.json['id'], request.json['room'])
    return 'SC'


@app.route('/src/remote/stop.py', methods=['PUT'])
def stop():
    id = request.json['id']
    room = request.json['room']
    # stop.stop_vm_by_id(request.json['id'], request.json['room'])
    return 'SC'


@app.route('/src/remote/update.py', methods=['PUT'])
def sleep():
    id = request.json['id']
    room = request.json['room']
    # update.update_vm_by_id(request.json['id'], request.json['room'])
    return 'SC'


if __name__ == '__main__':
    app.run(debug=True)
