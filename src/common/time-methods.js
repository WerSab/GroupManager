export const convertMilisToReadabletime = (millis)=>{
    const hours = Math.floor(millis/1000/60/60);
    const minutes = Math.floor((millis/1000/60/60 - hours)*60);
    return {hours, minutes};
}
