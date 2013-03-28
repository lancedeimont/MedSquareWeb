#!/bin/bash
cd public_html;
rsync -e 'ssh -ax' -av ./ --exclude=data miguelgalarreta@vision.ime.usp.br:/home/miguelgalarreta/www/medsquareweb/
