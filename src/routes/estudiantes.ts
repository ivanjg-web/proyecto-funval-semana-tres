import { Router, Request, Response } from "express";

const router: Router = Router ();

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

router.get("/", (req: Request, res: Response) => {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'Obtiene la lista de todos los estudiantes registrados. Permite filtrar por bootcamp mediante un parámetro de consulta.'
  // #swagger.parameters['bootcamp'] = { in: 'query', description: 'Nombre del bootcamp para filtrar estudiantes', type: 'string', required: false }
  // #swagger.responses[200] = { description: 'Lista de estudiantes obtenida correctamente' }
  const bootcamp = req.query.bootcamp;

  if (bootcamp) {
    const estudiantesFiltrados = estudiantes.filter(
      estudiante => estudiante.bootcamp === bootcamp
    );

    return res.status(200).json(estudiantesFiltrados);
  }

  res.status(200).json(estudiantes);
});

router.get("/:id", (req: Request, res: Response) => {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'Obtiene los datos de un estudiante utilizando su identificador.'
  // #swagger.parameters['id'] = { in: 'path', description: 'Identificador del estudiante', type: 'integer', required: true }
  // #swagger.responses[200] = { description: 'Estudiante encontrado correctamente' }
  // #swagger.responses[404] = { description: 'Estudiante no encontrado' }
  const id = Number(req.params.id);

  const estudiante = estudiantes.find(
    estudiante => estudiante.id === id
  );

  if (!estudiante) {
    return res.status(404).json({
      mensaje: "Estudiante no encontrado"
    });
  }

  res.status(200).json(estudiante);
});

router.post("/", (req: Request, res: Response) => {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'Registra un nuevo estudiante en el sistema. El correo electrónico es obligatorio.'
  // #swagger.parameters['body'] = { in: 'body', description: 'Datos del nuevo estudiante', required: true, schema: { nombre: 'Carlos Pérez', email: 'carlos@gmail.com', bootcamp: 'Backend' } }
  // #swagger.responses[201] = { description: 'Estudiante registrado correctamente' }
  // #swagger.responses[400] = { description: 'El campo email es obligatorio' }
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

router.put("/:id", (req: Request, res: Response) => {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'Actualiza los datos de un estudiante existente. Solo modifica los campos enviados.'
  // #swagger.parameters['id'] = { in: 'path', description: 'Identificador del estudiante', type: 'integer', required: true }
  // #swagger.parameters['body'] = { in: 'body', description: 'Datos que se desean actualizar', required: true, schema: { nombre: 'Carlos Pérez', email: 'carlos@gmail.com', bootcamp: 'Backend' } }
  // #swagger.responses[200] = { description: 'Estudiante actualizado correctamente' }
  // #swagger.responses[404] = { description: 'Estudiante no encontrado' }
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

router.delete("/:id", (req: Request, res: Response) => {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'Elimina un estudiante del sistema utilizando su identificador.'
  // #swagger.parameters['id'] = { in: 'path', description: 'Identificador del estudiante que se desea eliminar', type: 'integer', required: true }
  // #swagger.responses[200] = { description: 'Estudiante eliminado correctamente' }
  // #swagger.responses[404] = { description: 'Estudiante no encontrado' }
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
  mensaje: "Estudiante eliminado correctamente",
});
});
export default router;