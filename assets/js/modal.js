$(document).ready(function(){  //modal on-click opening
    var $resumepdf = $('#resume-modal').modal({
        show: false
    });
    $('#resume').on('click', function() {
        $resumepdf.modal('show');
    });
});    
