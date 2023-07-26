import { useEffect, useState } from "react";
const CreateStudent = () => {
    const [classInfo, setClass] = useState([]);
    const [avatarURL, setAvatarURL] = useState();
    const [dataimg, setDataimg] = useState()
    const imgInput = (e) => {
        const img = e.target.files[0]
        setDataimg(img)
        const imgLink = URL.createObjectURL(img)
        setAvatarURL(imgLink);
        console.log((img))

    }
    useEffect(
        () => {
            fetch('http://localhost:4000/api/getAllClass')
                .then(res => res.json())
                .then(contents => {
                    setClass(contents);
                })
        }
        , [])
    console.log("create")
    async function handleSubmit(event) {

        event.preventDefault();
        const data = new FormData();
        data.append('MSSV', event.target.elements.MSSV.value);
        data.append('Name', event.target.elements.Name.value);
        data.append('img', dataimg);
        data.append('Address', event.target.elements.Address.value);
        data.append('Birthday', event.target.elements.Birthday.value);
        data.append('password', event.target.elements.password.value);
        data.append('Class', event.target.elements.Class.value);
        data.append('Sex', event.target.elements.Sex.value);

        try {
            console.log(data.img)
            const res = await fetch('http://localhost:4000/api/createStudent', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: data
            });

            if (!res.ok) {
                throw new Error('Request failed with status ' + res.status.toString());
            }



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
                        <input type="file" name="img" onChange={imgInput} />
                        <img className="avatarImage" src={avatarURL}></img>
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
