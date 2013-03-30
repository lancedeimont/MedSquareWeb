function alerta() {
    alert(sessionStorage.getItem("autosave"));
}
;
function showVolume() {
    volume = new X.volume();
    volume.file = sessionStorage.getItem("volumePath");
    updateGUI();
    if (_webGLFriendly) {
        threeD.destroy();
        threeD = new X.renderer3D();
        threeD.container = '3Dslice';
        threeD.init();
    }
    sliceAxial.add(volume);
    sliceAxial.render();
}

$(function() {
    var rows = $("#rows"),
            columns = $("#columns"),
            allFields = $([]).add(rows).add(columns);
    $("#dialog-mosaic").dialog({
        autoOpen: false,
        height: 300,
        width: 350,
        modal: true,
        buttons: {
            "Start mosaic mode": function() {
                var bValid = true;
                allFields.removeClass("ui-state-error");

                bValid = bValid && checkLength(rows.val, "rows", 1, 3);
                bValid = bValid && checkLength(columns, "columns", 1, 3);

                bValid = bValid && checkRegexp(rows, /^([0-9]*[1-9][0-9]*)/, "Rows and columns must to be a number different of zero.");
                // From jquery.validate.js
                bValid = bValid && checkRegexp(columns, /^([0-9]*[1-9][0-9]*)/, "Rows and columns must to be a number different of zero.");

                if (bValid) {
                    alert('starting mosaic mode')
                    $(this).dialog("close");
                }
            },
            Cancel: function() {
                $(this).dialog("close");
            }
        },
        close: function() {
            allFields.val("").removeClass("ui-state-error");
        }
    });

    $("#mosaic")
            .button()
            .click(function() {
        $("#dialog-mosaic").dialog("open");
    });
});



//update all GUI controls created with dat-gui
function updateGUI() {
    //setting max values to the index of slices and the current index
    //the volume can't move to higher values
    guiAxial.max(volume.dimensions[2] - 1);
    guiAxial.setValue(volume.indexZ);
    guiSagital.max(volume.dimensions[0] - 1).setValue(volume.indexX);
    guiCoronal.max(volume.dimensions[1] - 1).setValue(volume.indexY);

    var minv = volume.min;
    var maxv = volume.max;
    //setting the max and min values for the window level controls
    guiLowerThresholdController.min(minv).max(maxv).setValue(minv);
    guiUpperThresholdController.min(minv).max(maxv).setValue(maxv);
    guiLowerWindowController.min(minv).max(maxv).setValue(minv);
    guiUpperWindowController.min(minv).max(maxv).setValue(maxv);
}
;
$("#btnOpen").click(function() {
    loadFileImage();
});
$("#btnUpdate").click(function() {
    updateGUI();
});

function loadFileImage() {
    volume = new X.volume();
    volume.file = 'http://x.babymri.org/?vol.nrrd';//'data/vessels.nii';                

    //It is necessary to load information from the volume before
    //renderings, it is a library bug
    updateGUI();

    if (_webGLFriendly) {
        threeD.destroy();
        threeD = new X.renderer3D();
        threeD.container = '3Dslice';
        threeD.init();
    }
    sliceAxial.add(volume);

    sliceAxial.render();
}
;

function buildGUI()
{
    //building the interfaces
    gui = new dat.GUI();

    //creating containers for the controls
    foldNavigation = gui.addFolder('Slice navigation');
    foldWindow = gui.addFolder('Window');
    foldLevel = gui.addFolder('Level');
    foldOther = gui.addFolder('Miscelaneous');

    //slices controls
    guiAxial = foldNavigation.add(volume, 'indexZ', 0,
            volume.dimensions[2] - 1).name('XY');

    guiSagital = foldNavigation.add(volume, 'indexX', 0,
            volume.dimensions[0] - 1).name('YZ');
    guiCoronal = foldNavigation.add(volume, 'indexY', 0,
            volume.dimensions[1] - 1).name('XZ');

    // .. configure the volume rendering opacity
    guiOpacityController = foldOther.add(volume, 'opacity', 0, 1);

    guiVolumeController = foldOther.add(volume, 'volumeRendering');

    //controls for the window
    guiLowerWindowController = foldWindow.add(volume, 'windowLow',
            volume.min, volume.max);
    guiUpperWindowController = foldWindow.add(volume, 'windowHigh',
            volume.min, volume.max);

    //controls of level
    guiLowerThresholdController = foldLevel.add(volume, 'lowerThreshold',
            volume.min, volume.max);
    guiUpperThresholdController = foldLevel.add(volume, 'upperThreshold',
            volume.min, volume.max);

    foldNavigation.open();
    foldWindow.open();
    foldLevel.open();
    foldOther.open();
}

function initializeSlices()
{
    // create the 2D renderers
    // here the axial, sagittal and coronal slices corresponds
    // to Z,X,Y orientations resepectively
    sliceAxial = new X.renderer2D();
    sliceAxial.container = 'axialSlice';
    sliceAxial.orientation = 'Z';
    sliceAxial.init();
    //sagital
    sliceSagittal = new X.renderer2D();
    sliceSagittal.container = 'sagitalSlice';
    sliceSagittal.orientation = 'X';
    sliceSagittal.init();
    //coronal
    sliceCoronal = new X.renderer2D();
    sliceCoronal.container = 'coronalSlice';
    sliceCoronal.orientation = 'Y';
    sliceCoronal.init();
}