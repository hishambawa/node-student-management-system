function addHandlers(app, studentDao) {
    app.get('/students', async (req, res) => {
        const response = await studentDao.getStudents();
        res.status(response.status).json(response.body);
    });

    app.post('/students', async (req, res) => {
        const student = req.body;
        const response = await studentDao.createStudent(student);
        res.status(response.status).json(response.body);
    });

    app.put('/students/:id', async (req, res) => {
        const id = req.params.id;
        const student = req.body;
        const response = await studentDao.updateStudent(id, student);
        res.status(response.status).json(response.body);
    });

    app.delete('/students/:id', async (req, res) => {
        const id = req.params.id;
        const response = await studentDao.deleteStudent(id);
        res.status(response.status).json(response.body);
    });
}

module.exports = addHandlers;