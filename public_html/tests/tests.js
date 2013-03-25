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

test("indexOfSlices",function(){
    
    
})

test("checkLength",function(){
    var rows =$( "#rows" )
    ok(checkLength( rows, "rows", 1, 3 ));
});

test( "load file", function(){
    var file='http://x.babymri.org/?vol.nrrd'
    loadWebFile(file); 
    ok( file==sessionStorage.getItem("volumePath") ,"Passed!");
});
