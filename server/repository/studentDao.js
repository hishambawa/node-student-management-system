class StudentDao {
    constructor(mongoRepo) {
        this.mongoRepo = mongoRepo;
    }

    async createStudent(student) {
        const successful = await this.mongoRepo.insert(student);

        if(successful) {
            return this.createResponse(200, 'Successfully created the student', student);
        } else {
            return this.createResponse(500, 'An error occurred while creating the student', null);
        }
    }

    async getStudents() {
        const students = await this.mongoRepo.getAll();

        return this.createResponse(200, 'Successfully retrieved students', students);
    }

    async updateStudent(id, student) {
        const successful = await this.mongoRepo.update(id, student);

        if(successful) {
            return this.createResponse(200, 'Successfully updated the student', student);
        } else {
            return this.createResponse(500, 'An error occurred while updating the student', null);
        }
    }

    async deleteStudent(id) {
        const successful = await this.mongoRepo.delete(id);

        if(successful) {
            return this.createResponse(200, 'Successfully deleted the student', null);
        } else {
            return this.createResponse(500, 'An error occurred while deleting the student', null);
        }
    }

    createResponse(status, message, data) {
        return {
            status: status,
            body: {
                message: message,
                data: data
            }
        };
    }
}

module.exports = StudentDao;