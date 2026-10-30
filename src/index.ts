import express from 'express';
import type { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerOutput from '../swagger_output.json' with { type: 'json' };
import estudiantesRouter from './routes/estudiantes';

const app = express();
const PORT = 3000;

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

app.get('/api/status', (req: Request, res: Response) => {
    res.status(200).json({
        status: "Servidor en linea",
        version: "1.0.0",
        Message: "El servidor está funcionando correctamente",
    });
});

app.use('/api/estudiantes', estudiantesRouter);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
