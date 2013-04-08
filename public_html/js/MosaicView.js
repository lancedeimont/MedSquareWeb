
/**
 * create containers for all the renderers in the mosaic view
 * @param {Int} nrow - number of rows
 * @param {Int} ncol - number of columns
 * @returns {void}
 */
function createDivs(nrow, ncol) 
{
    widthDiv = $(window).width() / ncol;
    //-100 because the header
    heightDiv = ($(window).height() - 100) / nrow;

    for (var i = 0; i < ncol; i++)
        for (var j = 0; j < nrow; j++)
        {
            var nameDiv = "div" + i + "x" + j;
            $('<div>', {
                id: nameDiv,
                class: "mossaicDiv",
                style: "float: left; width :" + widthDiv + "px;"
            }).css({borderWidth: '6px'}).appendTo('#mosaicDiv');

            if (i == 0 && j == 0)//it is the first div, load the volume
            {
                slice.container = nameDiv;
                slice.init();
                slice.add(volume);
                slice.render();
                renderers.push(slice);
            }
        }
    $('<div>', {
        id: "DivSpace" + i,
        style: "width : 100%; height:5px;",
        html: "<br/>"
    }).appendTo('#mosaicDiv');
}

/**
 * create renderers for each one of the divs
 * @param {Int} nrow - number of rows
 * @param {Int} ncol - number of columns
 * @returns {void}
 */
function createRenderers(nrow, ncol)
{
    var sizeVolume = volumet.dimensions[norientation];
    //indice do volume atual                
    for (var i = 0; i < ncol; i++)
        for (var j = 0; j < nrow; j++)
        {
            if (i != 0 || j != 0)//the first renderer was already created
            {
                var nameDiv = "div" + i + "x" + j;
                slicet = new X.renderer2D();
                volumet = new X.volume();
                var indx = (i * nrow + j) * gapping;
                //if it is the last slice show the last slice in the volume
                if ((i == ncol - 1) && (j == nrow - 1))
                    indx = sizeVolume - 1;
                renderers.push(create2DRender(nameDiv, indx));
            }
        }
}

/**
 * @typedef {(object)} 2DRender
 */
/**
 * create one render, given the container and the index of the slice that 
 * this render will show
 * 
 * @param {String} container - name of his container (div)
 * @param {Int} index - index of slice to be shown
 * @returns {Undefined} - 2DRender
 */
function create2DRender(container, index)
{
    slicet.container = container; 
    slicet.orientation = orientation;
    slicet.init();

    //volumet.fileData = volumes[0].image; //IMPORTANT!, It is not possible in XTK

    volumet.file = loadParammeter("volumePath");
    volumes.push(volumet);//add a volume if it is not the 
    //last div (one more was added innitially)

    slicet.add(volumet);
    //slicet.render();
    volumet.indexZ = index;
    return slicet;
}

/**
 * Call the render function of each one of the renderers created
 * @returns {void}
 */
function renderSlices() {
    for (var j = 0; j < rows; j++)
        for (var i = 0; i < columns; i++)//FIXME i< .. +1?
        {
            var ind = i + j * columns;
            renderers[ind].render();
            volumes[ind].indexZ = sliceIndex(i, j, rows, columns, gapping, volumet.dimensions[norientation]);
        }
}

