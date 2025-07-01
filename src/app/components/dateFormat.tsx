import {formatDistanceToNow} from 'date-fns';

export function DateFormat (date: string) {
    return formatDistanceToNow(new Date(date), {addSuffix: true});
}