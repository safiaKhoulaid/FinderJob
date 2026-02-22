import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe personnalisé pour afficher une date en format relatif.
 * Exemple: "il y a 2 jours", "il y a 3 heures"
 */
@Pipe({
    name: 'relativeTime',
})
export class RelativeTimePipe implements PipeTransform {
    transform(value: string | number | Date): string {
        if (!value) return '';

        const date = value instanceof Date ? value : new Date(value);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();

        if (diffMs < 0) return 'dans le futur';

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);
        const months = Math.floor(days / 30);

        if (months > 0) {
            return months === 1 ? 'il y a 1 mois' : `il y a ${months} mois`;
        }
        if (weeks > 0) {
            return weeks === 1 ? 'il y a 1 semaine' : `il y a ${weeks} semaines`;
        }
        if (days > 0) {
            return days === 1 ? 'il y a 1 jour' : `il y a ${days} jours`;
        }
        if (hours > 0) {
            return hours === 1 ? 'il y a 1 heure' : `il y a ${hours} heures`;
        }
        if (minutes > 0) {
            return minutes === 1 ? 'il y a 1 minute' : `il y a ${minutes} minutes`;
        }
        return 'à l\'instant';
    }
}
