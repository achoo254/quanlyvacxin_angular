// Call the dataTables jQuery plugin
$(document).ready(function() {
  setTimeout(() => {
    $('#datatableLichSuTiem').DataTable({
      "lengthMenu":[[-1], ["All"]]
    });
    $('#datatableDangKyTiem').DataTable({
      "lengthMenu":[[-1], ["All"]],
      "order": [[ 1, "asc" ]]
    });
    $('#datatableTiepTanRegimen').DataTable({
      "lengthMenu":[[-1], ["All"]]
    });
    $('#datatableTiepTan').DataTable({
      "lengthMenu":[[-1], ["All"]]
    });
    $('#dataTableThuNgan').DataTable({
      "lengthMenu":[[-1], ["All"]]
    });
    $('#dataTablePhongTiem').DataTable({
      "lengthMenu":[[-1], ["All"]]
    });
    $('#dataTablePhong').DataTable({
      "lengthMenu":[[-1], ["All"]]
    });
    $('#dataTableTonKho').DataTable({
      "order": [[ 1, "asc" ]],
      "lengthMenu":[[10, 20, 30, 40, -1], [10, 20, 30, 40, "All"]]
    });
  }, 3000);
});
