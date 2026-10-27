import express from 'express';

const app = express();
const PORT = 3000;
app.get(`/api/status`, (req,res)=> {
    res.json({
       status: "Servidor en linea",
       version: "1.0.0" 
    })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

