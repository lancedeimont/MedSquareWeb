#change the path to the jsdoc 3 lib to your jsdoc path
destiny="./MSQWjsdoc"
libJsdoc="~/libs/jsdoc/jsdoc"
pathjs="./public_html/js/"

if [ ! -d $destiny ]; then
    mkdir $destiny
fi
#echo "hola's"
#instruction with the form: libJsdoc --destination=./jsdoc/
#~/libs/jsdoc/jsdoc -d "$destiny" -r $pathjs
~/libs/jsdoc/jsdoc --verbose -d "$destiny" -r ~/programacion/netbeans/MedSquare/public_html/js/msqfunctions.js
