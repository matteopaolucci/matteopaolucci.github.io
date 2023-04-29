// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 33: 1, 38: 1, 34: 1, 40: 1 };
var clicked = false;

$(document).ready(function () {
    var target = document.querySelector("section#home");
    let observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                if(!clicked) 
                    changeArrow();
                obs.disconnect();
                if (entry.target == document.querySelector("main")) {
                    obs.observe(document.querySelector("section#home"));
                    target = document.querySelector("section#home");
                } else {
                    obs.observe(document.querySelector("main"));
                    target = document.querySelector("main");
                }
            }
        });
        if(clicked)
            setTimeout(() => {clicked = false}, 1000);
    }, { rootMargin: "0px", threshold: 0.5 });
    $("main > div").get(0).scrollIntoView({ behavior: 'smooth', block: 'center' });
    $(document).keydown(preventDefaultForScrollKeys);
    $("li#github > ul").click(() => {
        let arrow = "li#github > ul > li:last-child > i";
        $("li#github > div").slideToggle();
        $(arrow).fadeOut(() => {
            if ($(arrow).hasClass("fa-chevron-down")) {
                $(arrow).removeClass("fa-chevron-down");
                $(arrow).addClass("fa-chevron-up");
            } else {
                $(arrow).removeClass("fa-chevron-up");
                $(arrow).addClass("fa-chevron-down");
            }
            $(arrow).fadeIn();
        });
    });
    observer.observe(target);

    $("div#nav").click(function() {
        clicked = true;
        changeArrow();
    });
});

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        e.preventDefault();
        if (e.keyCode === 40 || e.keyCode === 34) {
            $("#home").get(0).scrollIntoView({ behavior: 'smooth' });
        } else if (e.keyCode === 38 || e.keyCode === 33) {
            $('main').get(0).scrollIntoView({ behavior: 'smooth' });
        }
        return false;
    }
}

function changeArrow() {
    let selector = "div#nav";
    if ($(selector).hasClass("clicked")) {
        $("main > div").get(0).scrollIntoView({ behavior: 'smooth', block: 'center' });
        $(selector).removeClass("clicked");
        $(selector).children("i").fadeOut(function () {
            $(this).removeClass("fa-chevron-up");
            $(this).addClass("fa-chevron-down");
            $(this).fadeIn();
        });
    } else {
        $(selector).addClass("clicked");
        $("#home").get(0).scrollIntoView({ behavior: 'smooth', block: 'end' });
        $(selector).children("i").fadeOut(function () {
            $(this).removeClass("fa-chevron-down");
            $(this).addClass("fa-chevron-up");
            $(this).fadeIn();
        });
    }
}