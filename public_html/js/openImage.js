/**
 * load a volume associated to an URL
 * @returns {void}
 */
$(function() {
    //function that waits for clicks in the images, they are saving the URL for each image
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
    $('.webImage').click(function() {//load the MPR mode
        parent.loadMPRmode();
    });
    $('#btnLoad').click(function() {
        loadWebFile($('#txtboxURL').val());
        //load the MPR mode
        try {
            parent.loadMPRmode();
        } catch (err)
        {
            window.write("error loading file");
        }

    });
});

