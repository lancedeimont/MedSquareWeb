//review if the length of the objects (o) value has a allowed length
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

//get the value of a parammeter in the session storage
function loadParammeter(v) {
    return sessionStorage.getItem(v);
}

//review if the fileName ends in the default extensions
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

//loads an image saved in the server
function loadWebFile(filePath) {
    //volume=new X.volume();
    //volume.file = filePath;
    currentImage = filePath;
    sessionStorage.setItem("volumePath", filePath);
}

//review if the value of the object (o) match the given regexp
function checkRegexp(o, regexp, n) {
    if (!(regexp.test(o.val()))) {
        o.addClass("ui-state-error");
        updateTips(n);
        return false;
    } else {
        return true;
    }
}
