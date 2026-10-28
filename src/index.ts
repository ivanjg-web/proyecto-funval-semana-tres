import express from 'express';
import type { Request, Response} from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

const estudiantes: Estudiante[] = [
  {
    id: 1,
    nombre: "Carlos Pérez",
    email: "carlos@gmail.com",
    bootcamp: "Backend"
  },
  {
    id: 2,
    nombre: "Laura Gómez",
    email: "laura@gmail.com",
    bootcamp: "Frontend"
  },
  {
    id: 3,
    nombre: "Andrés Rodríguez",
    email: "andres@gmail.com",
    bootcamp: "Full Stack"
  },
  {
    id: 4,
    nombre: "Mariana Torres",
    email: "mariana@gmail.com",
    bootcamp: "Backend"
  },
  {
    id: 5,
    nombre: "Daniel Martínez",
    email: "daniel@gmail.com",
    bootcamp: "Data Analyst"
  }
];

let siguienteId = 6;
 

app.get(`/api/estudiantes`, (req: Request, res: Response) => {
  res.status(200).json(estudiantes);
});

app.post(`/api/estudiantes`, (req: Request, res: Response) => {
  const{nombre, email, bootcamp} = req.body;

if (!email) {
  return res.status(400).json({
    mensaje: "El campo email es obligatorio",
  });
}
const nuevoEstudiante: Estudiante = {
  id: siguienteId,
  nombre,
  email,
  bootcamp,
  };
  estudiantes.push(nuevoEstudiante)
  siguienteId++;
  return res.status(201).json(nuevoEstudiante);
});

app.put(`/api/estudiantes/:id`, (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const estudiante = estudiantes.find (
    estudiante => estudiante.id === id
  );

  if (!estudiante){
    return res.status(404).json({
      mensaje: "Estudiante no encontrado"
    });
  }

const { nombre, email, bootcamp} = req.body
estudiante.nombre = nombre ?? estudiante.nombre;
estudiante.email = email ?? estudiante.email;
estudiante.bootcamp = bootcamp ?? estudiante.bootcamp;
res.status(200).json(estudiante);  
});

app.delete(`/api/estudiantes/:id`, (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const indice = estudiantes.findIndex(
    estudiante => estudiante.id === id
  );

if (indice === -1){
  return res.status(404).json({
    mensaje: "Estudiante no encontrado",
  });
}

estudiantes.splice(indice, 1);
res.status(200).json ({
  mensaje: "EStudiante eliminado correctamente",
});
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

