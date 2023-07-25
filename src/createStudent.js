import { useEffect, useState } from "react";
const CreateStudent = () => {
    const [tokenPrivate,setTokenPrivate]=useState('')
    const [classInfo, setClass] = useState([]);
    useEffect(
        () => {
            fetch('http://localhost:4000/api/getAllClass')
                .then(res => res.json())
                .then(contents => {
                    setClass(contents);
                })
        }
        , [])
    async function handleSubmit(event) {

        event.preventDefault();
        const data = Array.from(event.target.elements)
        .filter((input) => input.name)
        .reduce((obj, input) => Object.assign(obj, { [input.name]: input.value }), {});
        try {
            const res = await fetch('http://localhost:4000/api/createStudent', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            
            if (!res.ok) {
                throw new Error('Request failed with status ' + res.status.toString());
              }
            
              const dataFromServer = await res.json();
             

            } catch (error) {
              console.error('Error occurred:', error);
            }

    };
    return (
        <div className="CreateStudentForm">
            <>
                <h2>Thêm sinh viên</h2>
                <form method="post" action="/create" onSubmit={handleSubmit}>
                <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            MSSV
                        </label>
                        <input
                            type="text"
                            name="MSSV"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Name
                        </label>
                        <input
                            type="text"
                            name="Name"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                        />
                    </div>
                    <div className="mb-3">
                        <input type="file" name="img" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Address
                        </label>
                        <input
                            type="text"
                            name="Address"
                            className="form-control"
                            id="exampleInputPassword1"
                            required

                        />
                    </div>
                   
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">
                            Birthday
                        </label>
                        <input
                            type="date"
                            name="Birthday"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"

                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">
                            Mật khẩu
                        </label>
                        <input
                            type="text"
                            name="password"
                            className="form-control"
                            id="exampleInputPassword1"
                        />
                    </div>
                    <div className="mb-3">
                        <span>Tên lớp</span>
                        <select name="Class" >
                            {
                                classInfo.map((tab) => {
                                    return (
                                        <option key={tab.CLASSID} value={tab.CLASSNAME} >
                                            {tab.CLASSNAME}
                                        </option>
                                    )
                                })
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <span>Giới tính</span>
                        <select id="sex" name="Sex" >
                            <option value={"Nữ"}>Nữ</option>
                            <option value={"Nam"}>Nam</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </>

        </div>


    )
}
export default CreateStudent;
