    var nowTemp = new Date();
    var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
     
    var startDate = $('#startDateControl').datepicker({//Change to input Id
      onRender: function(date) {
        return date.valueOf() > now.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {
      if (ev.date.valueOf() > endDate.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        endDate.setValue(newDate);
      }
      startDate.hide();
      $('#endDateControl')[0].focus(); //Change to input 2
    }).data('datepicker');
    var endDate = $('#endDateControl').datepicker({
      onRender: function(date) {
        return date.valueOf() <= startDate.date.valueOf() ? 'disabled' : '';
      }
    }).on('changeDate', function(ev) {
      endDate.hide();
    }).data('datepicker');
