export default function DateConvert (date) {
    const isoDate = new Date(date);
    return isoDate.toISOString();
};