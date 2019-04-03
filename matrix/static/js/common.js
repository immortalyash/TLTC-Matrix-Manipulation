/**
 * Adding extra field in input tag for label tag transition
 */
$(document).on("change", "fieldset > input, fieldset > textarea", function (e) {
    $(e.currentTarget).attr('data-empty', !e.currentTarget.value);
});

/**
 * Method to convert error list to DOM Element
 * @param errors {Array}
 * @returns {string}
 */
function errorList(errors) {
    var error_list = "<ul class='error-list'>";

    // Attach error to list UI
    for (var _err in errors) {
        error_list += "<li>" + errors[_err] + "</li>";
    }
    error_list += "</ul>";
    return error_list;
}

/**
 * Method to convert ajax output to DOM Element
 * @param result {json}
 * #returns {string}
 */
function outputSuccess(result) {
    return "<code><pre>" + result + "</pre></code>";
}

/**
 * Method to check if data in list is NaN
 * @param dataList {Array}
 * @returns {boolean}
 */
function checkData(dataList) {
    for (var _d in dataList) {
        if (isNaN(dataList[_d])) {
            return false;
        }
    }

    return true;
}

/**
 * Method to validate context fields
 * @param context {object}
 * @param data {object}
 * @param validate {object}
 * #returns {boolean, dict}
 */
function validateFields(context, data, validate) {
    var validation = true;

    // Fetch all keys to validate
    const _keys = Object.keys(validate);
    const valid_operations = ["ADD", "SUB", "MUL", "TRA"];

    // Error list
    var errors = [];

    // Validate each fields marked to validate else set them null
    for (var _k in _keys) {

        // Check if validation is required
        if (validate[_keys[_k]]) {

            // Check what data to check
            if (_keys[_k] === "operator") {

                // Validate operator with valid operations
                if (!existElement(valid_operations, data[_keys[_k]])) {
                    errors.push(_keys[_k] + ": Please select a valid operation.");
                    validation = false;
                }
            } else {

                if (data[_keys[_k]] === "") {
                    errors.push(_keys[_k] + ": This field is required.");
                    validation = false;
                } else {
                    // Check matrix for valid inputs
                    try {
                        data[_keys[_k]] = data[_keys[_k]].replace("[", "");
                        data[_keys[_k]] = data[_keys[_k]].replace("]", "");
                        data[_keys[_k]] = data[_keys[_k]].split(",").map(Number);

                        // Confirm datatype
                        if (!checkData(data[_keys[_k]])) {
                            errors.push(_keys[_k] + ": Invalid dataType.");
                            validation = false;
                        }

                        // Check length of parameters for matrix param
                        if (_keys[_k] === "matrix_1_param" || _keys[_k] === "matrix_2_param") {

                            if (data[_keys[_k]].length !== 2) {
                                errors.push(_keys[_k] + ": Two elements required.");
                                validation = false;
                            }
                        }
                    } catch (e) {
                        // Invalid input data type
                        errors.push(_keys[_k] + ": Invalid input.");
                        validation = false;
                    }
                }
            }
        } else {

            // if validation is not required for particular data, set data as null
            data[_keys[_k]] = null;
        }
    }

    // Show/Hide errors if present
    if (errors.length > 0) {

        // Parse errors list to convert to DOM element.
        var errorElement = errorList(errors);
        $(context).find("#error-group")
            .html(errorElement)
            .removeClass("hidden");
    } else {
        // remove error list just in-case error list present in html
        $(context).find("#error-group")
            .addClass("hidden")
            .html("");
    }

    return [validation, data];
}

/**
 * Default ajax request maker for GET/POST
 * @param url {string} (Optional. Default: current url)
 * @param type {string} (Optional. Default: GET)
 * @param data {object} (Optional. Default: {})
 * @param dataType {string} (Optional. Default: json)
 * @param successFunction {function}
 * @param errorFunction {function} (Optional. Default: alert)
 * @param csrf_token {string} (Optional. Default: null)
 */
function sendAjaxRequest(url, type, data, dataType, successFunction, errorFunction, csrf_token) {
    if (url === null) {
        url = '';
    }

    if (type === null) {
        type = 'GET';
    }

    if (data === null) {
        data = {};
    }

    if (dataType === null) {
        dataType = 'json';
    }

    if (errorFunction === null) {
        errorFunction = function (xhr) {
            alert("Oops something seems wrong");
        };
    }

    if (csrf_token === null && type === "POST") {
        alert("CSRF token missing");
    }

    function before(xhr, settings) {
        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrf_token);
        }
    }

    $.ajax({
        url: url,
        type: type,
        data: JSON.stringify(data),
        dataType: dataType,
        contentType: "application/json",
        processData: false,
        beforeSend: before,
        success: successFunction,
        error: errorFunction
    })
}