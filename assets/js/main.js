function randomSorter() {
    var team = $(".rsorter"),
        kids = team.children(".sortable");

    while (kids.length) {
        team.append(kids.splice(Math.floor(Math.random() * kids.length), 1)[0]);
    }
}

Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

function carouselNormalization() {
    var items = $('.flex-grid-carousel .item'),
        heights = [],
        tallest;

    if (items.length) {
        function normalizeHeights() {
            items.each(function() {
                heights.push($(this).height());
            });
            tallest = Math.max.apply(null, heights);
            items.each(function() {
                $(this).css('min-height',tallest + 'px');
            });
        };

        normalizeHeights();

        $(window).on('resize orientationchange', function () {
            tallest = 0, heights.length = 0;
            items.each(function() {
                $(this).css('min-height','0');
            });
            normalizeHeights();
        });
    }
}

$(document).ready(function () {
    $.getJSON(baseurl + "/assets/data/quotes.json", function (d) {
        var now = new Date();
        var quoteCard = Handlebars.compile($("#quote-card-template").html());
        var quoteBlock = (now.getMonth() < d.length) ? now.getMonth() : now.getMonth() % d.length;
        var compiled = quoteCard({ quotes: d[quoteBlock] });

        $("#quotebook").html(compiled);

        randomSorter();
    });

    carouselNormalization();

    $('[data-toggle="tooltip"]').tooltip();

    $(".js-event").each(function (e) {
        var $this = $(this);
        var now = new Date();
        var date = new Date($this.data("date")).addDays(1);

        if (date.getTime() <= now) {
            $this.hide();
        }
    });
});
