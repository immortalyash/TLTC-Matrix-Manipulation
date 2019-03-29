/**
 * Dismiss Loader
 */
$(document).on('ready', function () {
   cssLoader();
});

/**
 * Adding extra field in input tag for label tag transition
 */
$(document).on("change", "fieldset > input, fieldset > textarea", function (e) {
    $(e.currentTarget).attr('data-empty', !e.currentTarget.value);
});

/**
 * Method to validate context fields
 * @param context Object
 * @param data Object
 * @param validate Object
 */
function validateFields(context, data, validate) {
    var validation = true;
    var valid = '1px solid #E4E4E4';
    var not_valid = '1px solid #F44336';

    // Validate first name
    if (validate['first_name']) {
        if ((data.first_name).length < 2) {
            validation = false;
            $(context).find('#first-name').css({'border-bottom': not_valid});
        } else {
            $(context).find('#first-name').css({'border-bottom': valid});
        }
    }

    // Validate last name
    if (validate['last_name']) {
        if ((data.last_name).length < 1) {
            validation = false;
            $(context).find('#last-name').css({'border-bottom': not_valid});
        } else {
            $(context).find('#last-name').css({'border-bottom': valid});
        }
    }

    // Validate DOB
    if (validate['dob']) {
        // Validate DOB format
        if ((data.dob).length === 0 || (data.dob).length === 10) {
            $(context).find('#dob').css({'border-bottom': valid});
        } else {
            validation = false;
            $(context).find('#dob').css({'border-bottom': not_valid});
        }
    }

    // Validate Phone
    if (validate['phone']) {
        if ((data.phone).length > 0 && !isNaN(parseFloat(data.phone))) {
            if ((data.phone).length === 10) {
                $(context).find('#phone').css({'border-bottom': valid});
            } else {
                validation = false;
                $(context).find('#phone').css({'border-bottom': not_valid});
            }
        } else {
            $(context).find('#phone').css({'border-bottom': valid});
        }
    }

    // Validate email
    if (validate['email']) {
        var regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (((data.email).length > 4 && (data.email).length < 150) && regex_email.test(data.email)) {
            $(context).find('#email').css({'border-bottom': valid})
        } else {
            validation = false;
            $(context).find('#email').css({'border-bottom': not_valid});
        }
    }

    // Validate old password
    if (validate['old_password']) {
        if ((data.old_password).length < 8) {
            validation = false;
            $(context).find('#old-password').css({'border-bottom': not_valid});
        } else {
            $(context).find('#old-password').css({'border-bottom': valid});
        }
    }

    // Validate password
    if (validate['password']) {
        if ((data.password).length > 7 && (data.password).length < 100) {
            $(context).find('#password').css({'border-bottom': valid});
        } else {
            validation = false;
            $(context).find('#password').css({'border-bottom': not_valid});
        }
    }

    // Validate re typed password
    if (validate['re_password']) {
        if ((data.re_password).length > 7 && data.password === data.re_password) {
            $(context).find("#re-password").css({"border-bottom": valid})
        } else {
            validation = false;
            $(context).find('#re-password').css({"border-bottom": not_valid})
        }
    }

    // Validate bio
    if (validate['bio']) {
        if ((data.bio).length > 0) {
            if ((data.bio).length < 50 || (data.bio).length > 250) {
                validation = false;
                $(context).find('#bio').css({'border-bottom': not_valid});
            } else {
                $(context).find('#bio').css({'border-bottom': valid});
            }
        }
    }

    // Validate g-captcha
    if (validate['g_captcha']) {
        if (data.g_captcha === "") {
            validation = false;
            $(context).find('.g-recaptcha > div').css({'border': not_valid});
        } else {
            $(context).find('.g-recaptcha > div').css({'border': valid});
        }
    }

    return validation;
}

/**
 * Show/hide loader
 */
function cssLoader() {
    var loader = $('#cssLoader');
    if (loader.hasClass('hidden')) {
        loader.removeClass('hidden');
    } else {
        loader.addClass('hidden');
    }
}

/**
 * Default ajax request maker for GET/POST
 * @param url String (Optional. Default: current url)
 * @param type String (Optional. Default: GET)
 * @param data Object (Optional. Default: {})
 * @param dataType String (Optional. Default: json)
 * @param successFunction Function
 * @param errorFunction Function (Optional. Default: alert)
 */
function sendAjaxRequest(url, type, data, dataType, successFunction, errorFunction) {
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

            if (typeof grecaptcha !== 'undefined') {
                // reset the captcha after use
                grecaptcha.reset();
            }
        };
    }

    $.ajax({
        url: url,
        type: type,
        data: data,
        dataType: dataType,
        success: successFunction,
        error: errorFunction
    })
}