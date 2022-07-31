import moment from 'moment';

export default function TimeConvert (time) {
    const isoTime = moment(time, 'HH:mm');      
    return isoTime.toISOString();
};