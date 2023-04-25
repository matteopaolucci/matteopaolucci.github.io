$(document).ready(function () {
    $("li#github > ul").click(() => {
        $("li#github > section").slideToggle();
    });
});