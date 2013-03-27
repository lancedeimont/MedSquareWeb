#!/bin/bash
cd public_html;
rsync -a --exclude=data miguelgalarreta@vision.ime.usp.br:/home/miguelgalarreta/www/medsquareweb/
