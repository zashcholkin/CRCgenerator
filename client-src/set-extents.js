//set extents checkboxes after change well-known polynom
$("#well-known-polynoms-select").on("change", function () {
    var extentsList = ($("#well-known-polynoms-select option:selected").attr("data-polynom"));

    setExtentsCheckboxes(extentsList);
});

function setExtentsCheckboxes(extentsList) {
    if(extentsList == undefined){
        return;
    }

    var extentsArr = extentsList.split(",");

    //unchecked all extents checkboxes
    $("#extents-div input[type='checkbox']").prop("checked", false);

    //checked checkboxes from extentsList
    for (var i = 0; i < extentsArr.length; i++) {
        $(`#extents-div input[type='checkbox'][name='${extentsArr[i]}']`).prop("checked", true)
    }

    $("#extents-div").trigger("change");
}