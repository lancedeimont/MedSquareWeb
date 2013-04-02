/* 
 * Tests for the MedSquare Web
 */
test( "test true", function() {
ok( 1 == "1", "Passed!" );
});

test("sliceIndex",function(){
    //sliceIndex(x, y, ny, nx, gap, volumDimens)
    ok(sliceIndex(0, 0, 3, 3, -1, 10)==0,"Passed!");
    ok(sliceIndex(2, 2, 3, 3, -1, 10)==9,"Passed!");
    ok(sliceIndex(1, 0, 3, 3, 1, 10)==1,"Passed!");
    ok(sliceIndex(2, 0, 3, 3, 1, 10)==2,"Passed!");
    ok(sliceIndex(2, 3, 4, 3, -1, 10)==9,"Passed!");
    ok(sliceIndex(4, 2, 4, 3, 1, 12)==10,"Passed!");
})

test("checkFile",function(){
    var txt="arquivo.nii";
    var imput=document.createElement('input');
    imput.setAttribute("type","text");
    imput.setAttribute("value",txt);
        
    var r=checkFile(imput);
    ok(r==true,"Passed file "+txt+"!");
    
    txt="arquivo.bmp";
    imput.setAttribute("value",txt);
    ok(checkFile(imput)==false,"Passed for file"+txt+"!");
})

test("loadParammeters",function(){
    sessionStorage.setItem("test", "testValue");    
    sessionStorage.setItem("test2", 12345);    
    ok(loadParammeter("test2")=="12345","Passed!");
    ok(loadParammeter("test")==="testValue","Passed!");    
})

test("loadWebFile",function(){
    loadWebFile("path");
    ok(loadParammeter("volumePath")=="path","Passed!")
})


test( "load file", function(){
    var file='http://x.babymri.org/?vol.nrrd'
    loadWebFile(file); 
    ok( file==sessionStorage.getItem("volumePath") ,"Passed!");
});

test("create Renderer",function()
{ 
    var divcont=document.createElement('div');
    divcont.setAttribute('name','divCont');
    
    sessionStorage.setItem('volumePath','data/sivT1.nii');   
    slicet = new X.renderer2D();
    index=0;
    var rend=create2DRender('divTests',index);    
    ok(volumet.indexZ==index,"Passed!");    
    rend.render();    
});

//we are aproveitting the data created in the previous test
test("initializeSlices", function(){    
    initializeSlices();
    ok(sliceAxial.orientation == 'Z',"Passed!");
    ok(sliceCoronal.orientation == 'Y',"Passed!");
  //  slicet.onShowtime = function() {
  //              redrawAll();                
  //          };
});