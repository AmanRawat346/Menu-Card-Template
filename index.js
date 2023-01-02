const http = require('http');
const url = require('url');
const fs = require('fs');

const replace = require('./jsModules/replaceModule');
const button = require('./jsModules/buttonsModule');
const item = require('./jsModules/itemModules');

const mainhtml = fs.readFileSync(`./templates/index.html`, 'utf-8');
const menuCards = fs.readFileSync(`${__dirname}/templates/menuItems.html`, 'utf-8');
const menuItem = fs.readFileSync(`${__dirname}/templates/menuItem-template.html`, 'utf-8');

const data = fs.readFileSync('dev-data/data.json');
let dataObj = JSON.parse(data);
const buttonCards = button(dataObj);

const server = http.createServer((req, res) => {
    const { query, pathname, path } = url.parse(req.url, true);

    if (path.startsWith('/photos')) {

        res.writeHead(200, {
            'content-type': 'image/jpg/webp',
        });
        console.log(__dirname, path);
        const imageBuffer = fs.readFileSync(__dirname + path)
        res.end(imageBuffer);
    }

    else if (pathname === '/') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });

        const cardshtml = dataObj.map(ele => replace(menuCards, ele)).join("");
        const output = mainhtml.replace('{%MenuCards%}', cardshtml).replace('{%ButtonsMenu%}', buttonCards);
        res.end(output);

    } else if (pathname === '/product') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        const product = dataObj[query.id - 1];
        console.log('product called', product);
        const output = item(menuItem, product);
        res.end(output);
    }
    else if (pathname === '/category') {
        res.writeHead(200, {
            'content-type': 'text/html'
        });
        const category = query.category;
        const cardshtml = filterButton(category, dataObj);
        output = mainhtml.replace('{%MenuCards%}', cardshtml).replace('{%ButtonsMenu%}', buttonCards);
        res.end(output);
    }
    else {
        res.writeHead(400, {
            'content-type': 'text/html'
        });
        res.end(`<h1>Page Not Found!</h1>`);
    }
});

filterButton = (category, dataObj) => {
    dataObj = dataObj.filter(e => e.category === category);
    const output = dataObj.map(product => replace(menuCards, product, imagePath)).join('');
    return output;
}

server.listen("8000", () => {
    console.log('Listening to requests on port 8000');
})
 