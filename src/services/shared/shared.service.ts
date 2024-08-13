import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
    toLocalISOString(date = new Date()) {
        const offset = date.getTimezoneOffset();
        const sign = offset > 0 ? '-' : '+';
        const pad = (num) => String(num).padStart(2, '0');
    
        const localDate = new Date(date.getTime() - offset * 60000);
    
        const year = localDate.getFullYear();
        const month = pad(localDate.getMonth() + 1); // Les mois commencent à 0 en JavaScript
        const day = pad(localDate.getDate());
        const hours = pad(localDate.getHours());
        const minutes = pad(localDate.getMinutes());
        const seconds = pad(localDate.getSeconds());
    
        const timezoneOffsetHours = pad(Math.abs(Math.floor(offset / 60)));
        const timezoneOffsetMinutes = pad(Math.abs(offset % 60));
    
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${sign}${timezoneOffsetHours}:${timezoneOffsetMinutes}`;
    }
    
}
