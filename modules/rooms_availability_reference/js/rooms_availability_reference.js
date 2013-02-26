(function ($) {


Drupal.behaviors.rooms_availability_reference = {
  attach: function(context) {
    var minDate =new Date();
    var i = 0;

    $('.cal').each(function() {
      var j = i;
      var lastSource;

      $(this).fullCalendar({
        ignoreTimezone:false,
        editable:false,
        month:minDate.getMonth(),
        year:minDate.getFullYear(),
        header:{
          left: 'today',
  				center: 'title',
  				right: 'prev, next'
        },
        viewDisplay: function(view) {
          if (view.name == 'month') {
            source = {
              url: '?q=rooms/units/unit/'
                      + Drupal.settings.roomsAvailabilityRef[j].unitID
                      + '/availability/json/'
                      + view.start.getFullYear()
                      + '/'
                      + (view.start.getMonth() + 1)
                      +'/1/' //start day
                      + view.end.getFullYear()
                      +'/'
                      + (view.end.getMonth() + 1)
                      +'/1/' // end day
                      + Drupal.settings.roomsAvailabilityRef[j].style
            };

            view.calendar.removeEventSource(lastSource)
            view.calendar.refetchEvents();

            view.calendar.addEventSource(source)
            view.calendar.refetchEvents();

            lastSource = source;
          }
        }
      });

      i++;
    });


    // Resize takes care of some quirks on occasion
    $(window).resize();

  }
};
})(jQuery);
