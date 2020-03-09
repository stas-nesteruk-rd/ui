import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import hbs from 'hbs';
import { apiRouter } from '../../src/router';
import dateFormat from 'handlebars-dateformat';

const app = express();
const router = express.Router();

const publicDirectoryPath = path.join(process.cwd(), '/public');
const viewsDirectoryPath = path.join(process.cwd(), '/templates/views');
const partialsDirectoryPath = path.join(process.cwd(), '/templates/partials');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

hbs.registerHelper('dateFormat', dateFormat);
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);

app.use((req, res, next) => {
    console.log("IT'S UI SIDE " + req.originalUrl);
    next();
});

hbs.registerPartials(partialsDirectoryPath);
hbs.registerHelper('ifCond', function (v1, operator, v2, options)  {
    switch (operator) {
        case '==': {
            console.log('v1' + v1);
            console.log('v2' + v2);
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        }
            
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
});

app.use(express.static(publicDirectoryPath));

router.get('/', (req, res) => {
    res.redirect('/api/products');
});

router.get('*', (req, res) => {
    res.render('error', {
        error: 'Ups, something went wrong..'
    });
});

app.use(apiRouter);
app.use(router);

export default app;
