import express from 'express';
import type { Request, Response} from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());
app.get(`api/status`, (req: Request,res: Response)=> {
    res.status(200).json({
       status: "Servidor en linea",
       version: "1.0.0", 
       Message: "El servidor está funcionando correctamente",
    })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

