const { connection, connectDatabase } = require('../config/config')
connection.connectDatabase();
class Student {
    constructor(name, age, grade) {
        this.name = name;
        this.age = age;
        this.grade = grade;
    }
   
getAllStudents =() =>
{
    return new Promise((resolve,reject)=>
    {
        connection.query('select * from users',(err,students)=>
        {
            if(err)
            {
                
                reject("lỗi")
            }
            else
            resolve(students)
        })
    }

)}
}
module.exports = Student;