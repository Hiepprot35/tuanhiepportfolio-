export default function getTime(data)
{
        const timestamp =  data;
        const timeSent=new Date(data)
        const date = new Date();
        const result=date.getTime()-timeSent.getTime()
        const hour = Math.floor(result/(1000*60*60))
        const minute=Math.floor(result/(1000*60))-60*hour
        const second=Math.floor(result/(1000))-60*minute
        const currentDay = timeSent.getDate();
        const currentHours = timeSent.getHours();
        const currentMinutes = timeSent.getMinutes();
        const currentSeconds = timeSent.getSeconds();
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Tháng trong JavaScript bắt đầu từ 0 (0 - 11)
        const day = date.getUTCDate();
        return(`${currentHours}:${currentMinutes}:${currentSeconds}`)
        

    
}