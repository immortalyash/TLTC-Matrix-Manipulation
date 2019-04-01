/**
 * Method to check if element exist in array
 * @param arr Array
 * @param _elem String
 */
function existElement(arr, _elem) {
    for (var _index in arr) {
        if (arr[_index] === _elem) {
            return true;
        }
    }
    return false;
}

/**
 * Show hide matrix 2 and its param depending on operation selected
 */
$(document).on("change", ".operator", function () {
    var operator = $(this).val();
    var context = $(this).parent().parent();
    const both_matrix_operators = ["ADD", "SUB", "MUL"];

    // Un/Hide matrix 2 depending on operation selected
    if (existElement(both_matrix_operators, operator)) {
        $(context).find(".hidden-group").removeClass("hidden");
    } else {
        $(context).find(".hidden-group").addClass("hidden");
    }

    // Clear error and output field
    $('#error-group').addClass("hidden").html("");
    $('.output-body').html("");
});

/**
 * Method to clear calculator
 * @param context DOM Element
 */
function clearFields(context) {
    // Clear error and ouput field
    $('#error-group').addClass("hidden").html("");
    $('.output-body').html("");

    // Clear fields
    $(context).find(".operator:checked").prop("checked", false);
    $(context).find("#matrix-a").val("");
    $(context).find("#matrix-a-params").val("");
    $(context).find("#matrix-b").val("");
    $(context).find("#matrix-b-params").val("");

    // Hide fields
    $(context).find(".hidden-group").addClass("hidden");
}

/**
 * Method to convert error dict to error list
 * @param error_data {json}
 * @returns {Array}
 */
function fetchErrors(error_data) {
    var _keys = Object.keys(error_data);
    var errorList = [];

    for (var _k in _keys) {
        errorList.push(_keys[_k] + ": " + error_data[_keys[_k]])
    }

    return errorList;
}

/**
 * Method to calculate given inputs
 * @param context DOM Element
 */
function calculate(context) {
    const url = "/operate/";
    const both_matrix_operators = ["ADD", "SUB", "MUL"];

    // Clear previous output
    $('.output-body').html("");

    // Collect all data values
    var matrix_a = $(context).find('#matrix-a').val();
    var matrix_a_params = $(context).find('#matrix-a-params').val();
    var matrix_b = $(context).find('#matrix-b').val();
    var matrix_b_params = $(context).find('#matrix-b-params').val();
    var operator = $(context).find('.operator:checked').val();
    var csrf_token = $(context).find('input[name="csrf_token"]').val();

    // Transform all data to required form
    var data = {
        "matrix_1": matrix_a,
        "matrix_1_param": matrix_a_params,
        "matrix_2": matrix_b,
        "matrix_2_param": matrix_b_params,
        "operator": operator,
        "x-csrf": csrf_token
    };

    // Set validation fields
    var validate = {
        "matrix_1": true,
        "matrix_1_param": true,
        "matrix_2": false,
        "matrix_2_param": false,
        "operator": true,
        "csrf_token": true
    };

    // Add validation for matrix 2
    if (existElement(both_matrix_operators, operator)) {
        validate['matrix_2'] = true;
        validate['matrix_2_param'] = true;
    }

    // Validate all required fields, retrieve data
    var validation_data = validateFields(context, data, validate);
    data = validation_data[1];
    if (!validation_data[0]) {
        return;
    }

    // Success function of ajax request
    function succesFunction(response) {
        // Response is processed by server
        if (response.success) {
            var outputElem = outputSuccess(response.data.result);

            // Display output
            $('.output-body').html(outputElem);
        } else {
            var _errors = fetchErrors(response.data);
            var errorElem = errorList(_errors);
            $('#error-group').html(errorElem).removeClass("hidden");

            // Clear previous output
            $('.output-body').html("");
        }
    }

    // Send AJAX request
    sendAjaxRequest(url, "POST", data, null, succesFunction, null);
}