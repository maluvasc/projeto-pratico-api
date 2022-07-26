const express = require('express');
const swaggerUi = require('swagger-ui-express');
const app = express();
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productsRoutes');
const swaggerFile = require('./swagger/swagger_output.json');
const PORT = 3000

app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server up in http://localhost:${PORT}/`)
});

app.use('/api', userRouter);
app.use('/api/products', productRouter);