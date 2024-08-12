export const getDateTimeNow = () => {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const timeCurrent = today.toLocaleTimeString();
    return `${month}${date}${year}${timeCurrent}`;
};