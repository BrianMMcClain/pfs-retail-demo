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
    for (i = 0; i < inv.length; i++) {
        $("#invList").append("<li><input type=\"checkbox\" name=\"invCheck\" class=\"cartItem\" value=\"" + inv[i].id + "\" onchange=\"cartUpdate(this)\">" + inv[i].name + "</li><br />");
    }
}

function getCartIds() {
    var cart = $('.cartItem:checkbox:checked');
    var cartIds = [];
    for (i = 0; i < cart.length; i++) {
        cartIds.push(cart[i].value);
    }
    return cartIds;
}

function cartUpdate(box) {
    var cartIds = getCartIds();

    if (cartIds.length == 0) {
        return;
    }
    
    // Request recommendations
    $.ajax({
        url: "/recommendations",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: cartIds.join(','),
        success: function(response) {
            updateRecommendations(response);
        },
        error: function(response) {
            alert(JSON.stringify(response));
        }
    });
}

function updateRecommendations(response) {

    // Wipe current recommendations
    $("#rec1name").text("User Recommendation");
    $("#rec1desc").text("");
    $("#rec2name").text("User Recommendation");
    $("#rec2desc").text("");
    $("#rec3name").text("User Recommendation");
    $("#rec3desc").text("");

    if (response.length >= 1) {
        $("#rec1name").text(response[0].name);
        $("#rec1desc").text("$" + response[0].price);
    }

    if (response.length >= 2) {
        $("#rec2name").text(response[1].name);
        $("#rec2desc").text("$" + response[1].price);
    }

    // if (response.length >= 3) {
    //     $("#rec3name").text(response[2].name);
    //     $("#rec3desc").text("$" + response[2].price);
    // }
}

function checkout() {
    var cartIds = getCartIds();

    if (cartIds.length == 0) {
        return;
    }
    
    // Request recommendations
    $.ajax({
        url: "/checkout",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: cartIds.join(','),
        success: function(response) {
            finishCheckout(response);
        },
        error: function(response) {
            alert(JSON.stringify(response));
        }
    });
}

function finishCheckout(response) {
    // Uncheck all items
    $('.cartItem:checkbox:checked').each(function() {
        var $this = $(this);
        $this.prop('checked', false);
    });

}