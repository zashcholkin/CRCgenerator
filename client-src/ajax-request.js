$("#polynom-form").on("submit", function (event) {
    event.preventDefault();
    $.ajax({
        url: $(this).attr("action"),
        type: "get",
        data: $(this).serialize(),
        success: function (data) {
            $("#VHDL-destination").html(data.vhdlCode);
            var vhdlCRCLinksDiv = $("#VHDL-CRC-links");
            vhdlCRCLinksDiv.html("");
            vhdlCRCLinksDiv.show();
            vhdlCRCLinksDiv
                .append(`<a href=${data.vhdlFile} download class="VHDL-link">Download Main CRC VHDL Code</a>`)
                .append("<a href=\"DFF.vhd\" download class=\"VHDL-link\">Download D Flip-Flop VHDL Code</a>")
                .append("<a href=\"XOR2.vhd\" download class=\"VHDL-link\">Download XOR VHDL Code</a>");

        },
        error: function () {
            $("#VHDL-destination").text("VHDL code was not received from the server. Try to get VHDL code again");
        }
    });
});