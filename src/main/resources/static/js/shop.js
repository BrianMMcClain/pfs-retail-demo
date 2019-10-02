function loadShop() {

    req = {
        action: "inventory"
    };

    $.ajax({
        url: "/inventory",
        method: "GET",
        dataType: "json",
        success: function(response) {
            populateInventory(response);
        },
        error: function(response) {
            alert(JSON.stringify(response));
        }
    });
}

function populateInventory(inv) {
    console.log("Populating inventory");
    console.log(inv);

    for (i = 0; i < inv.length; i++) {
        $("#invList").append("<li>" + inv[i].name + "</li><br />");
    }
}