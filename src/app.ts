import express, { Application } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import Routes from './app/routes';

const app: Application = express();
app.use(cors());

//parser

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/', Routes);
//application routes
// app.use('/api/v1/', UserRoutes);
// app.use('/api/v1/', AcademicSemesterRoutes);

//console.log(app.get('env'))

//testing
/* app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  //throw new Error('Testing error logger')
}) */

//global error handler
app.use(globalErrorHandler);

export default app;
