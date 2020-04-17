import routes from './routes';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import requestIp from 'request-ip';

mongoose
    .connect("mongodb://mongo:27017/db")
    .then(() => {
        console.log("Connected to mongoDB");
    })
    .catch((e) => {
        console.log("Error while DB connecting");
        console.log(e);
    });

const app = express();

const urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.use(cors());

app.use(urlencodedParser);

app.use(bodyParser.json());

app.use(requestIp.mw());

morgan.token('body', (req, res) => JSON.stringify(req.body));

app.use(morgan('[:date[web]] Started :method :url for :remote-addr', true));
app.use(morgan('[:date[web]] Started with body :body', true));
app.use(morgan('[:date[iso]] Completed :status :res[content-length] in :response-time ms',),);

const router = express.Router();
app.use("/", routes);

const port = 8800;
app.listen(port, () => console.log(`Listening on port ${port}`));