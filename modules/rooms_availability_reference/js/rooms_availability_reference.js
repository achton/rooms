(function ($) {


Drupal.behaviors.rooms_availability_reference = {
  attach: function(context) {
    var today = new Date();

    $('.cal').once('cal', function() {
      var lastSource;
      var cal_id = $(this).siblings('.availability-title').attr('id');

      $(this).fullCalendar({
        ignoreTimezone:false,
        editable:false,
        dayNamesShort:[Drupal.t("Sun"), Drupal.t("Mon"), Drupal.t("Tue"), Drupal.t("Wed"), Drupal.t("Thu"), Drupal.t("Fri"), Drupal.t("Sat")],
        monthNames:[Drupal.t("January"), Drupal.t("February"), Drupal.t("March"), Drupal.t("April"), Drupal.t("May"), Drupal.t("June"), Drupal.t("July"), Drupal.t("August"), Drupal.t("September"), Drupal.t("October"), Drupal.t("November"), Drupal.t("December")],
        month:today.getMonth(),
        year:today.getFullYear(),
        header:{
          left: 'today',
          center: 'title',
          right: 'prev, next'
        },
        viewDisplay: function(view) {
          if (view.name == 'month') {
            for (var url in lastSource) {
              view.calendar.removeEventSource(lastSource[url]);
            }
            view.calendar.refetchEvents();

            lastSource = [];
            for (var index = 0; index < Drupal.settings.roomsAvailabilityRef[cal_id].unitID.length; index++) {
              url = '?q=rooms/units/unit/' + Drupal.settings.roomsAvailabilityRef[cal_id].unitID[index] + '/availability/json/'
                + view.start.getFullYear() + '/' + (view.start.getMonth() + 1);

                view.calendar.addEventSource(url);

                lastSource[index] = url;
            }

          }
        }
      });

    });


    // Resize takes care of some quirks on occasion
    $(window).resize();

  }
};
})(jQuery);
