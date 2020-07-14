const fs = require('fs');
const path = require('path');
const digitalocean = require('digitalocean');

async function main() {
    const [node, processName, apiKey, domain, name] = process.argv;

    const client = digitalocean.client(apiKey);
    const content = fs.readFileSync(path.join(__dirname, '..', 'mail.txt'), 'utf-8');

    const result = content.match(/\((.+)\)/ms)[1].replace(/["\s]/g, '');

    client.domains.createRecord(domain, { type: 'TXT', name: `${name}._domainkey`, data: result });
}


main();