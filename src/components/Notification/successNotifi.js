import { useEffect } from "react"
export default function SuccessNotification(props) {
    const message=props.messRes;
    useEffect(() => {
        message && setTimeout(() => {
            props.setMessRes(null)
        }, 1000)
    }, [message])
    return (
        message && 
            <div className="confirm-dialog noti">
                <div className='confirm_layout'>
                    <p>
                        {message}
                    </p>
                </div>
            </div>

        
    )
}
