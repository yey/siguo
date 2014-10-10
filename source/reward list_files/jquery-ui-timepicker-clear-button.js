(function($){
   var old_fn = $.datepicker._updateDatepicker;

   $.datepicker._updateDatepicker = function(inst) {
      old_fn.call(this, inst);

      var buttonPane = $(this).datepicker("widget").find(".ui-datepicker-buttonpane");

      $("<button type='button' class='ui-datepicker-clean ui-state-default ui-priority-primary ui-corner-all'>Clear</button>").appendTo(buttonPane).click(function(ev) {
          inst.input.val('');
          $(inst.settings.altField).val('');
      });
   }
})(jQuery);
