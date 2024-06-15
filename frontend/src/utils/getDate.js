function getDate(){
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.toLocaleString('default', { month: 'short' });
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let meridiem = hours >= 12 ? "PM" : "AM";
    
    hours = hours % 12;
    hours = hours ? hours : 12; // "0" hour should be "12"
    minutes = minutes < 10 ? "0" + minutes : minutes;
    
    return `Today, ${day} ${month} ${year}, ${hours}:${minutes} ${meridiem}`;
}

export default getDate;
