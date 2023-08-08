import { useRefresh } from "./hook/useRefresh";




export  const getInfoUser = async (URL,AccessToken) => {
    try {
        const response = await fetch(URL, {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${AccessToken}`
            }
        });
      return response
    } catch (error) {

        console.error(error)
    }
}