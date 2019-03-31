import copy

from flask import Flask
from flask import jsonify
from flask import render_template
from flask import request

from flask_wtf.csrf import CSRFProtect
from werkzeug.utils import MultiDict

from matrix.constants.constants import GLOBAL_API_RESPONSE
from matrix.manager.form_manager import OperationForm
from matrix.manager.matrix_manager import MatrixManager


app = Flask(__name__, template_folder='matrix/static/templates', static_folder='matrix/static')

# Secret Key
app.config['SECRET_KEY'] = "J#08@m#En26GVRNsuJ278I^q5taKN!t%yow1#oG2I4E62c2NcmB54eRa#R4O7BDAai#g1smTTwrf#PH0hwLCAT%aBW!TGdBZ#5yl"

# CSRF
csrf = CSRFProtect(app)

# Logger
LOGGER = app.logger


@app.route('/')
def home():
    return render_template('pages/home.html')


@app.route('/operate/', methods=["POST"])
@csrf.exempt
def operate_matrix():
    """
    Method to handle POST request to handle matrix manipulation
    :return:
    """
    def _convert_matrix_format(_data):
        """
        Method to convert all list data to required form
        :param _data: dict
        :return: dict
        """
        _result = []
        _matrix = ["matrix_1", "matrix_1_param", "matrix_2", "matrix_2_param"]

        for _m in _matrix:
            # Matrix
            if _data.get(_m):
                _result += _clean_matrix_data(_data.get(_m), _m)

        # Update data
        for _res in _result:
            _data.update({
                _res[0]: _res[1]
            })

        # Remove list access
        for _m in _matrix:
            if _data.get(_m):
                del _data[_m]

        return _data

    def _clean_matrix_data(_data, _prefix):
        """
        Method to convert matrix data to required form
        :param _data: List
        :param _prefix: String
        :return: List
        """
        _result = []
        _index = 0

        for _d in _data:
            _key = "%s-%d" % (_prefix, _index)
            _result.append([_key, _d])
            _index += 1

        return _result

    result = copy.copy(GLOBAL_API_RESPONSE)
    # Fetch form data and convert to dict format
    data = request.get_json()
    # Convert matrix data
    data = _convert_matrix_format(data)
    data = MultiDict(data)

    # clean data
    form = OperationForm(data)

    # Validate form
    if form.validate():
        operated_data = None
        operator = form.operator.data

        matrix = MatrixManager(form.matrix_1.data, form.matrix_1_param.data,
                               form.matrix_2.data, form.matrix_2_param.data)

        # Perform requested operations
        if operator == "ADD":
            operated_data = matrix.add()
        elif operator == "SUB":
            operated_data = matrix.subtract()
        elif operator == "MUL":
            operated_data = matrix.multiplication()
        elif operator == "TRA":
            operated_data = matrix.transpose()

        # Check if operation successful
        if operated_data is not None:
            result['success'] = True
            result['data'] = {
                'result': str(operated_data)
            }
            result['message'] = "Calculations successful"
        else:
            result['message'] = operated_data
    else:
        result['data'] = form.errors
        result['message'] = "Validation Errors"

    return jsonify(result)


@app.route('/contributors/')
def contributors():
    return render_template('pages/contributors.html')


@app.route('/about/')
def about():
    return render_template('pages/about.html')
