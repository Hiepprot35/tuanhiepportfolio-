const sendEmail = async (email, message) => {
    try {
        const data = {
            to: email,
            subject: 'Prototype',
            message: message
        };

        const res = await fetch(`${process.env.REACT_APP_DB_HOST}/api/send-email`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const resApi = await res.json();
        alert(resApi);
    } catch (error) {
        console.error("Error sending email: ", error);
        alert(error);
    }
};

export default sendEmail;
