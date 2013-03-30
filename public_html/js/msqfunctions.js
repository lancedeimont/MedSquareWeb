/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
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

//returns an index that represent the slice number, given his position            
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

function loadParammeter(v) {
    return sessionStorage.getItem(v);
}

function checkFile(fileName) {
    var fileExtension = "";
    if (fileName.value.lastIndexOf(".") > 0) {
        fileExtension = fileName.value.substring(fileName.value.lastIndexOf(".") + 1,
                fileName.value.length);
    }
    if (fileExtension == "gif") {
        return true;
    }
    else {
        alert("You must select a GIF file for upload");
        return false;
    }
}

//loads an image saved in the server
function loadWebFile(filePath) {
    //volume=new X.volume();
    //volume.file = filePath;
    currentImage = filePath;
    sessionStorage.setItem("volumePath", filePath);
}

function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
        o.addClass("ui-state-error");
        updateTips(n);
        return false;
    } else {
        return true;
    }
}