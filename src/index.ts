import express from 'express';
import images from './routes/api/images';

const app = express();
const port = 3091;

app.use('/api/images', images);

app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});

export default app;
