
const mysql=()=>
{

}
const connection =mysql.createConnection(
    {
        host:'localhost',
        user:'root',
        password:'',
        database:'sinhvien',
    }
)
async function connectDatabase()
{
    try {
        await connection.connect();
        console.log("Kết nối  thành công")


    } catch (error) {
        console.log("Kết nối không thành công")
    }
}

module.exports={connection,
    connectDatabase}