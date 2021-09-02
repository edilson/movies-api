import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(routes);

app.listen(3000, () => console.log('Server running!'));
