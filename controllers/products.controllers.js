const fs = require('fs');
const path = require('path');
const boom = require('@hapi/boom');
const { parse } = require('csv-parse');

const loadProducts = async(req, res, next) => {
    const { filePath } = req.body;
    try {
        const pathLocation = path.resolve(__dirname, filePath);
        const readFile = fs.createReadStream(pathLocation);
        let rows = [];
        let elements = [];
        readFile
            .on('error', (err) => {
                throw next(boom.notFound(err));
            })
            .pipe(parse({ delimiter: ','}))
            .on('data', (data) => {
                rows.push(data)
            })
            .on('end', () => {
                elements = tableToJSON(rows);
                next(elements);
                res.json(elements);
            });
    } catch(err) {
        next(err);
    }
    
};

const tableToJSON = (rows) => {
    let elements = [];
    for(let i = 1; i<rows.length; i++) {
        const row = rows[i];
        let newElement = {};
        for (let j = 0; j < row.length; j++){
            newElement = Object.assign(newElement, { [rows[0][j]]: row[j]});
        }
        elements = [...elements, newElement];
    }

    return elements;
};


module.exports = {
    loadProducts
}