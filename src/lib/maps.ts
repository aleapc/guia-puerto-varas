import type { Attraction } from './content';

/**
 * Deep link that opens the device's map app (Google Maps on Android, Google/Apple on iOS).
 * Named places (shops, restaurants) search by name; nature spots route to coordinates.
 */
export function mapsUrl(a: Attraction): string {
  return a.mapQuery
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a.mapQuery)}`
    : `https://www.google.com/maps/dir/?api=1&destination=${a.lat},${a.lng}`;
}
