const {program} = require('commander');
const path = require('path');
const fs = require('fs');
const express = require('express');

const app = express();

program
    .requiredOption('-h, --host <address>', 'адреса сервера')
    .requiredOption('-p, --port <number>', 'порт сервера')
    .requiredOption('-c, --cache <path>', 'шлях до директорії, яка міститиме кешовані файли');

program.parse();

const options = program.opts();

app.use(express.text());
app.use(express.json());

app.get('/notes/:noteName', (req, res) => {
    const notePath = path.join(options.cache, `${req.params.noteName}.txt`);

    if (!fs.existsSync(notePath)) {
        return res.status(404).send('Note not found');
    }

    const noteContent = fs.readFileSync(notePath, 'utf8');
    res.send(noteContent);
});

app.put('/notes/:noteName', (req, res) => {
    const notePath = path.join(options.cache, `${req.params.noteName}.txt`);

    if (!fs.existsSync(notePath)) {
        return res.status(404).send('Note not found');
    }

    fs.writeFileSync(notePath, req.body);
    res.status(200).send('Note updated successfully');

});

app.delete('/notes/:noteName', (req, res) => {
    const notePath = path.join(options.cache, `${req.params.noteName}.txt`);

    if (!fs.existsSync(notePath)){
        return res.status(404).send('Note not found');
    }
    fs.unlinkSync(notePath);
    res.status(200).send('Note deleted successfully');
});

app.listen(options.port, options.host, () => {
    console.log(`Server started on http://${options.host}:${options.port}`);
});

