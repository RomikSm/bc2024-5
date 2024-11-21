const {program} = require('commander');
const express = require('express');

const app = express();

program
    .requiredOption('-h, --host <address>', 'адреса сервера')
    .requiredOption('-p, --port <number>', 'порт сервера')
    .requiredOption('-c, --cache <path>', 'шлях до директорії, яка міститиме кешовані файли');

program.parse();

const options = program.opts();

app.listen(options.port, options.host, () => {
    console.log(`Server started on http://${options.host}:${options.port}`);
});

