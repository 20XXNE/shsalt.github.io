$(document).ready(function(){  //modal on-click opening
    var $resume_pdf = $('#resume-modal').modal({
        show: false
    });
    $('#resume').on('click', function() {
        $resume_pdf.modal('show');
    });
    
});    
