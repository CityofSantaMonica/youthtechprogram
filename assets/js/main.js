Date.prototype.addDays = function(days)
{
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

$(document).ready(function () {
    //$.getJSON("/assets/data/quotes.json", function (d) {
    //    var quoteCard = Handlebars.compile($("#quote-card-template").html());
    //    var compiled = quoteCard({ sources: d });
    //
    //    $("#quote-carousel").html(compiled)
    //});

    $(".js-event").each(function (e) {
        var $this = $(this);
        var now = new Date();
        var date = new Date($this.data("date")).addDays(1);

        if (date.getTime() <= now) {
            $this.hide();
        }
    });
});
