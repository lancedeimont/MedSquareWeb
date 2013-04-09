

/**
 * load the MPR mode
 * @returns {void}
 */
function loadMPRmode() {
    if (mode !== 0)//it is not in mpr mode
    {
        var ifrm = document.getElementById("frVisualiz");
        ifrm.setAttribute("src", "MPRView.html");
        mode = 0;
        $("#btnMPR").hide();
        $("#btnMosaic").show();
    }
}

/**
 * events click in the buttons 
 * @returns {void}
 */
$(function() {
    
    $("#btnOpen").button().click(
            /**
             * load the catalog mode
             * @returns {void}
             */function() {
        var ifrm = document.getElementById("frVisualiz");
        ifrm.setAttribute("src", "openImage.html");
        mode = -1;
        //show buttons in the menu
        $("#btnMosaic").show();
        $("#btnMPR").show();
    });
    $("#btnMPR").button().click(function() {
        loadMPRmode();
    });
    $("#btnMosaic").button().click(function() {
        if (mode !== 1)//currently we are in mpr mode loading mosaic
        {//show a dialog and load mosaic view
            $("#dialog-mosaic").dialog("open");
        }
    });

    $("#btnAbout").button().click(function() {
        var ifrm = document.getElementById("frVisualiz");
        ifrm.setAttribute("src", "about.html");
        $("#btnMPR").show();
        $("#btnMosaic").show();
        mode = -1;
    });
});

/**
 * functions to show the mosaic dialog
 * @returns {void}
 */
$(function() {
    var rows = $("#rows"),
            columns = $("#columns"),
            gapping = $("#gappingTxt"),
            allFields = $([]).add(rows).add(columns);
    $("#dialog-mosaic").dialog({
        autoOpen: false,
        height: 330,
        width: 400,
        modal: true,
        buttons: {
            /**
             * open mosaic dialog and load mosaic mode if all is right
             * @returns {void}
             */
            "Start mosaic mode": function() {
                var bValid = true;
                allFields.removeClass("ui-state-error");

                bValid = bValid && checkLength(rows, "rows", 1, 2);
                bValid = bValid && checkLength(columns, "columns", 1, 2);

                // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                bValid = bValid && checkRegexp(rows, /^([0-9]*[1-9][0-9]*)/, "Rows and columns must to be a number different of zero.");
                bValid = bValid && checkRegexp(columns, /^([0-9]*[1-9][0-9]*)/, "Rows and columns must to be a number different of zero.");

                if (bValid) {//starting mosaic mode
                    //saving values to session variables
                    sessionStorage.setItem("rows", rows.val());
                    sessionStorage.setItem("columns", columns.val());

                    if ($("#automaticCB").is(":checked"))
                        sessionStorage.setItem("gapping", "-1");
                    else
                        sessionStorage.setItem("gapping", $("#gappingTxt").val());
                    sessionStorage.setItem("volumePath", currentImage)

                    $(this).dialog("close");
                    //load page of mosaic view
                    var ifrm = document.getElementById("frVisualiz");
                    ifrm.setAttribute("src", "mosaicView.html?rows=" + rows + "&columns=" + columns);
                    mode = 1;

                    //show and hide buttons in the menu
                    $("#btnMosaic").hide();
                    $("#btnMPR").show();
                } else
                {
                    alert('The values must to be numbers');
                }
            },
                    /**
                     * cancel and close the mosaic dialog
                     * @returns {void}
                     */
            Cancel: function() {
                $(this).dialog("close");
            }
        },
                /**
                 * close the mosaic dialog
                 * @returns {void}
                 */
        close: function() {
            allFields.val("").removeClass("ui-state-error");
        }

    });
    
    /**
     * @event when a click in the checkbox is maded para deshabilitar o control
     */
    $("#automaticCB").click(function() {

        if ($("#automaticCB").is(":checked"))
        {
            $("#labGapping").attr('disabled', true);
            $("#gappingTxt").attr('disabled', true).parent().css({color: '#ccc'});
        }
        else
        {
            $("#labGapping").attr('disabled', false);
            $("#gappingTxt").attr('disabled', false).parent().css({color: '#000'});
        }

    });
});
