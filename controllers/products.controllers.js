const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

const loadProducts = async(req, res) => {
    const { filePath } = req.body;
    try {
        const pathLocation = path.resolve(__dirname, filePath);
        console.log('Loader found!!: ', pathLocation);
        let rows = [];
        let elements = [];
        fs.createReadStream(pathLocation)
            .pipe(parse({ delimiter: ','}))
            .on('data', (data) => {
                rows.push(data)
            })
            .on('end', () => {
                elements = tableToJSON(rows);
                console.log(elements);
                res.status(200).json(elements);
            })
            .on('error', (err) => {
                console.log(err);
                throw new Error(err);
            });
    } catch(err) {
        res.status(500).json({message: err.message});
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