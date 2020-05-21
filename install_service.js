var Service = require('node-windows').Service;
const path = `${__dirname}\\dist\\src\\index.js`;

var svc = new Service({
    name:'fsw-bridge-api',
    description: 'Serviço para consulta ao banco de dados',
    script: path
});

svc.on('install',function() {
    svc.start();
});
svc.install();