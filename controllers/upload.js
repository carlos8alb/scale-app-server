'use strict'

var fs = require('fs');
var uniqid = require('uniqid');

function saveFile(req, res) {

    let destination = req.params.destination;
    let id = req.params.id;

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            message: 'No selecionó ningún archivo'
        });
    }

    var file = req.files.file;
    var totalFiles = req.files.file.length || 1;

    if (totalFiles > 1 && (destination === 'users' || destination === 'pacients')) {
        return res.status(400).json({
            ok: false,
            message: 'No puede subir mas de un archivo.'
        });
    }



    var shortName = file.name.split('.');
    var extensionFile = shortName[shortName.length - 1];

    var validExtensions = ['png', 'gif', 'jpg', 'jpeg'];
    if (validExtensions.indexOf(extensionFile) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'Extensión no válida'
        });
    }

    // Create unique name
    var fileName = `${ id }-${ uniqid() }.${ extensionFile }`;

    // Create path
    var path = `./uploads/${ destination }/${ fileName }`;

    switch (destination) {
        case 'users':
            uploadFile('user', destination, id, fileName, res, file, path);
            break;

        case 'pacients':
            uploadFile('pacient', destination, id, fileName, res, file, path);
            break;

            // case 'measures':
            //     return res.status(200).json({
            //         ok: false,
            //         destination
            //     });

        default:
            return res.status(404).json({
                ok: false,
                message: 'Page not found'
            });
    }

};

function uploadFile(modelType, destination, id, fileName, res, file, path) {

    var Model = require(`../models/${ modelType }`);

    Model.findById(id, (err, model) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Error buscando archivo en modelo.',
                error: err
            });
        }

        if (!model) {
            return res.status(400).json({
                ok: false,
                message: 'Error subiendo buscando en modelo.',
            });
        }

        var oldPath = `./uploads/${ destination }/${ model.img }`;

        file.mv(path, (err) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Error guardando archivo nuevo.',
                    error: err
                });
            }
        });

        // Delete if image exists
        if (fs.existsSync(oldPath)) {
            fs.unlink(oldPath, (err) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Error eliminando archivo existente.',
                        error: err
                    });
                }
            });
        }

        // Save new file name in model
        model.img = fileName;
        model.save((err, modelUpdated) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: `Error actualizando ${ modelType }.`,
                    error: err
                });
            }

            if (modelType === 'user') modelUpdated.password = '';

            return res.status(200).json({
                ok: true,
                message: 'El archivo se subió correctamente.',
                modelUpdated
            });

        });

    });

}

module.exports = {
    saveFile
};