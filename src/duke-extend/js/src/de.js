(function ($) {
    $('iframe[src^="https://www.youtube"], iframe[src^="https://warpwire"]')
        .addClass('embed-responsive-item')
        .parent().addClass('embed-responsive-16by9 embed-responsive');
}) ($PBJQ);