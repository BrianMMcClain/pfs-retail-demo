function loadShop() {

    req = {
        action: "inventory"
    };

    console.log(JSON.stringify(req));

    $.ajax({
        url: "/inventory",
        method: "GET",
        dataType: "json",
        success: function(response) {
            console.log(response);
        },
        error: function(response) {
            alert(JSON.stringify(response));
        }
    });
}