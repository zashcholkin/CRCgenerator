$("#extents-div").on("change", function (event) {
    var extentsCheckboxesArr = $("#extents-div input[type='checkbox']");
    var checkedExtentsArr = [];

    for (var i = 0; i < extentsCheckboxesArr.length; i++) {
        if($(extentsCheckboxesArr[i]).prop("checked")){
            var checkedExtent = $(extentsCheckboxesArr[i]).attr("name");
            checkedExtentsArr.push(checkedExtent==0 ? 1 : `X<sup>${checkedExtent}</sup>`);
        }
    }

    $("#polynom-render-div").html(checkedExtentsArr.reverse().join("&nbsp+&nbsp"));
});
