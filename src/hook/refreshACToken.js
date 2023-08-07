

export const rfToken = async () => {
    try {
        const response2 = await fetch('http://localhost:4000/api/rfAccessToken', {
            method: "GET",
            credentials: 'include',
        });

        const data2 = await response2.json();
        if (data2.error) {
            throw new Error('Failed to fetch data from the server.');
        }
        return data2
    } catch (error) {
        console.log("Error:", error);
    }
};