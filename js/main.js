var target;
var lastChangeArrow;

$(document).ready(function () {
    target = document.querySelector("section#home");
    lastChangeArrow = Date.now();
    const OBSERVER = new IntersectionObserver(intersetctionCallback, { rootMargin: "0px", threshold: 0.6 });

    document.querySelector("main > div").scrollIntoView({ behavior: 'smooth', block: 'center' });
    $(document).keydown(preventDefaultForScrollKeys);
    $("li#github > ul").click(function () {
        $("li#github > div").slideToggle();
        $("li#github > ul > li:last-child > i").fadeOut(function () {
            if ($(this).hasClass("fa-chevron-down")) {
                $(this).removeClass("fa-chevron-down");
                $(this).addClass("fa-chevron-up");
            } else {
                $(this).removeClass("fa-chevron-up");
                $(this).addClass("fa-chevron-down");
            }
            $(this).fadeIn();
        });
    });
    $("main>div>ul>li:not(:first-child)").on("click tap", function() {
        $("a.link").removeClass("link");
        $(this).find("a").addClass("link");
    });
    $("div#nav").click(() => { changeArrow(true) });
    OBSERVER.observe(target);
});

function preventDefaultForScrollKeys(e) {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    const KEYS = { 33: 1, 38: 1, 34: 1, 40: 1 };
    if (KEYS[e.keyCode]) {
        e.preventDefault();
        if (e.keyCode === 40 || e.keyCode === 34) {
            $("#home").get(0).scrollIntoView({ behavior: 'smooth' });
        } else if (e.keyCode === 38 || e.keyCode === 33) {
            $('main').get(0).scrollIntoView({ behavior: 'smooth' });
        }
        return false;
    }
}

function intersetctionCallback(entries, obs) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            changeArrow(false);
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
}

function changeArrow(clicked) {
    const SCROLL_DELAY_MS = 800;
    const SELECTOR = "div#nav";
    $("a.link").removeClass("link");
    document.activeElement = null;
    if (Date.now() - lastChangeArrow > SCROLL_DELAY_MS) {
        if ($(SELECTOR).hasClass("clicked")) {
            if (clicked) {
                setTimeout(() => {
                    document.querySelector("main").scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
            $(SELECTOR).removeClass("clicked");
            $(SELECTOR).children("i").fadeOut(function () {
                $(this).removeClass("fa-chevron-up");
                $(this).addClass("fa-chevron-down");
                $(this).fadeIn();
            });
        } else {
            if (clicked) {
                setTimeout(() => {
                    document.querySelector("#home").scrollIntoView({ behavior: 'smooth', block: 'center' });
                }, 300);
            }
            $(SELECTOR).addClass("clicked");
            $(SELECTOR).children("i").fadeOut(function () {
                $(this).removeClass("fa-chevron-down");
                $(this).addClass("fa-chevron-up");
                $(this).fadeIn();
            });
        }
        lastChangeArrow = Date.now();
    }

    if ($("li#github > ul > li:last-child > i").hasClass("fa-chevron-up")) {
        $("li#github > div").slideUp();
        $("li#github > ul > li:last-child > i").removeClass("fa-chevron-up");
        $("li#github > ul > li:last-child > i").addClass("fa-chevron-down");
    }
}
