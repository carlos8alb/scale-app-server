// ============================
// SEED de autenticación
// ============================

module.exports.SEED = '@scale-app';

// ============================
// Puerto
// ============================

process.env.PORT = process.env.PORT || 3977;

// ============================
// Entorno
// ============================

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================
// Base de Datos
// ============================

let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/scale-app-db';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;