$(document).ready(function () {
    jQuery.datepicker.setDefaults(jQuery.datepicker.regional[localUi]);
    var options = {
        dateFormat: "dd/mm/yy",
        beforeShow: function (input) {
            $(input).css({
                "position": "relative",
                //"z-index": 860,
                "text-align": "left"
            });
        },
        showOn: 'button',
        buttonText: 'Show Date',
        buttonImageOnly: true,
        buttonImage: '/Content/img/commun/picto-calendar.svg'
    };
    $(".datefield").datepicker(options);
    $(".datefield").mask("99/99/9999");
});