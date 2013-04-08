/*global publish:true*/
/** 
 * @project MedSquareWeb
 * @author Miguel Angel Galarreta Valverde
*/ 

/**
 * review if the length of the objects (o) value has a allowed length
 * @param {object} o - object (textbox) to analyze
 * @param {int} n - size to check
 * @param {int} min - minimum size
 * @param {int} max -maximum size
 * @returns {Boolean}
 */
function checkLength(o, n, min, max) {
    if (o.val().length > max || o.val().length < min) {
        o.addClass("ui-state-error");
        updateTips("Length of " + n + " must be between " +
                min + " and " + max + ".");
        return false;
    } else {
        return true;
    }
}
        
/**
 * returns an index that represent the slice number, given his position
 * @param {type} x - position in x axis
 * @param {type} y - position in y axis
 * @param {type} ny - number of rows
 * @param {type} nx - columns number
 * @param {type} gap - gapping between two slices
 * @param {type} volumDimens - number of slices in the volume
 * @returns {unresolved}
 */
function sliceIndex(x, y, ny, nx, gap, volumDimens)
{
    var indx = 0;
    if (gap == -1)//gap automático
    {
        var sizeVolume = volumDimens;
        gap = sizeVolume / (nx * ny);//calculate the gap
        indx = (x + y * nx) * gap;
        if (x == nx - 1 && y == ny - 1)//it is the last
            indx = sizeVolume - 1;
    }
    else
        indx = (x + y * nx) * gap;
    return indx;
}

/**
 * get the value of a parammeter in the session storage
 * @param {String} v - name of the desired value
 * @returns {string}
 */
function loadParammeter(v) {
    return sessionStorage.getItem(v);
}

/**
 * review if the fileName ends in the default extensions
 * @param {String} fileName - name of the file
 * @returns {Boolean}
 */
function checkFile(fileName) {
    var fileExtension = "";
    if (fileName.value.lastIndexOf(".") > 0) {
        fileExtension = fileName.value.substring(fileName.value.lastIndexOf(".") + 1,
                fileName.value.length);
    }
    if (fileExtension == "nii") {
        return true;
    }
    else {
        alert("You must select a NII file for upload");
        return false;
    }
}

/**
 * set the path of an image as current and save it
 * @param {String} filePath
 * @returns {void}
 */
function loadWebFile(filePath) {
    //volume=new X.volume();
    //volume.file = filePath;
    currentImage = filePath;
    sessionStorage.setItem("volumePath", filePath);
}

/**
 * review if the value of the object (o) match the given regexp
 * @param {Object} o - object that contain the string
 * @param {String} regexp - regular expression
 * @param {Int} n
 * @returns {Boolean}
 */
function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
        o.addClass("ui-state-error");
        updateTips(n);
        return false;
    } else {
        return true;
    }
}
