jQuery.validator.defaults.onfocusout = function (element, event) {
    if (!$(element).hasClass("error")) return;
    if ($(element).hasClass("datefield")) return;
    $(element).valid();
}

jQuery.validator.defaults.onkeyup = function (element, event) {
    if (!$(element).hasClass("error")) return;
    $(element).valid();
}

function initValidation() {
    $("#addDefaultValueForm").validate({
        errorElement: "span",
        errorPlacement: function (error, element) {
            element.parent().children("span.error").remove();
            $(error).appendTo(element.parent());
        },
        invalidHandler: function (ev, validator) {
            var element = null;
            for (var x = 0; x < validator.errorList.length && element == null; x++) {
                if (validator.errorList[x].element.tagName == "select") {
                    var element = $(validator.errorList[x].element);
                    element.next('.select2-container').css('border', '2px solid #f10202').css('border-radius', '23px');
                }
            }
        },
        success: function (error, element) {
            if (element.tagName == "select") {
                $("#addDefaultValueForm").find(".select2-container").css('border', 'none');
            }
        },
        ignore: "",
        rules: {
            selectCountry: {
                required: true
            },
            selectCostType: {
                required: true
            },
            selectGenre: {
                required: true
            },
            input_rate: {
                required: true
            }
        },
        messages: {
            selectCountry: {
                required: translation.requiredField
            },
            selectCostType: {
                required: translation.requiredField
            },
            selectGenre: {
                required: translation.requiredField
            },
            input_rate: {
                required: translation.requiredField
            }
        }
    });
}