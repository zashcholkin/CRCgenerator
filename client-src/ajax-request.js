$("#polynom-form").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
        url: $(this).attr("action"),
        type: "get",
        data: $(this).serialize(),
        success: function (data) {
            $("#VHDL-destination").html(data);
            $("#VHDL-CRC-links").show();
        },
        error: function () {
            $("#VHDL-destination").text("VHDL code was not received from the server. Try to get VHDL code again");
        }
    });
});