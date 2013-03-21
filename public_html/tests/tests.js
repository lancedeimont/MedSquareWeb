/* 
 * Tests for the MedSquare Web
 */
test( "test true", function() {
ok( 1 == "1", "Passed!" );
});

test( "load file", function(){
    var file='http://x.babymri.org/?vol.nrrd'
    loadWebFile(file); 
    ok( file==sessionStorage.getItem("volumePath") ,"Passed!");
});
