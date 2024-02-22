import '../UserProfile/userProfile.css'
import { useSectionInView } from "../../hook/useSectionInView";
import { useState } from 'react';
import sendEmail from '../../function/SendEmail';
export default function ContactPropage() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const { ref } = useSectionInView("Contact");
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };
    // const sendEmail = async (email,message) => {
    //     try {
    //         const data = {
    //             "to": email,
    //             "subject": 'Prototype',
    //             "message": message

    //         }
    //         const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/send-email`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(data)
    //         })
    //         const resApi = await res.json()
    //         alert(resApi);

    //     } catch (error) {
    //         console.error("Error sending email: ", error);
    //         alert(error);
    //     }
    // };
    return (

        <section className="container_input" id='#contact' ref={ref}>

            <div className="text">
                Contact me
            </div>
            <form  onSubmit={sendEmail(email,message)}>
               
                <div className="form-row">
                    <div className="input-data">
                        <input type="text" required value={email} onChange={handleEmailChange}
                        />
                        <div className="underline"></div>
                        <label htmlFor="">Email Address</label>
                    </div>

                </div>
                <div className="form-row">
                    <div className="input-data textarea">
                        <textarea rows={8} cols={80} required

                            onChange={handleMessageChange}
                            value={message}

                        ></textarea>
                        <br />
                        <div className="underline"></div>
                        <label htmlFor="">Write your message</label>
                        <br />
                        <div className="form-row submit-btn">
                            <div className="input-data">

                            <input style={{padding:"1rem",backgroundColor:"blue"}} type="submit" value="Send"/>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </section>

    )
}