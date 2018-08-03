$('#myModal').on('show.bs.modal', function (e) {
    if (!data) return e.preventDefault() // stops modal from being shown
  })



$("#datetime").datepicker({
    format: 'yyyy-mm-dd hh:ii'
});
