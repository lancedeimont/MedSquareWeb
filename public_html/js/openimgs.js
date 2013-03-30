$(function() {
    $('#MRIchild').click(function() {
        loadWebFile('http://x.babymri.org/?vol.nrrd');
    });
    $('#MRIchild2').click(function() {
        loadWebFile('http://x.babymri.org/?avf.nrrd');
    });
    $('#MRIcerebro').click(function() {
        loadWebFile('data/sivT1.nii');
    });
    $('#vessels').click(function() {
        loadWebFile('data/vessels.nii');
    });
    $('#angioMRI').click(function() {
        loadWebFile('data/marcel_angio.nii');
    });
    $('.webImage').click(function() {
        parent.loadMPRmode();
    });
    $('#btnLoad').click(function() {
        alert($('txtboxURL').val());
        loadWebFile($('txtboxURL').val());
    });
});

