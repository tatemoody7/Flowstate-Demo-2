/**
 * Distance calculation utilities for Flowstate
 * Uses Haversine formula for accurate GPS-based distances
 */

import { Place, PlaceLocation } from "@/data/mockData";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

// FGCU Campus coordinates (default fallback)
export const FGCU_COORDS: Coordinates = {
  latitude: 26.4625,
  longitude: -81.7718,
};

/**
 * Calculate distance between two GPS coordinates using the Haversine formula
 * @returns distance in miles
 */
export function getDistanceMiles(
  from: Coordinates,
  to: Coordinates
): number {
  const R = 3958.8; // Earth's radius in miles
  const dLat = toRad(to.latitude - from.latitude);
  const dLon = toRad(to.longitude - from.longitude);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.latitude)) *
      Math.cos(toRad(to.latitude)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Format a distance in miles to a human-readable string
 */
export function formatDistance(miles: number): string {
  if (miles < 0.1) {
    return "< 0.1 mi";
  }
  return `${miles.toFixed(1)} mi`;
}

/**
 * Given a list of location coordinates, find the closest one
 * @returns index of closest location and its distance
 */
export function findClosestLocation(
  from: Coordinates,
  locations: Coordinates[]
): { index: number; distance: number } {
  let closestIndex = 0;
  let closestDistance = Infinity;

  locations.forEach((loc, i) => {
    const dist = getDistanceMiles(from, loc);
    if (dist < closestDistance) {
      closestDistance = dist;
      closestIndex = i;
    }
  });

  return { index: closestIndex, distance: closestDistance };
}

/**
 * Get the nearest location for a Place from the user's position
 */
export function getNearestLocation(
  place: Place,
  from: Coordinates
): { location: PlaceLocation; distance: number; locationCount: number } {
  const coords = place.locations.map((loc) => loc.coords);
  const { index, distance } = findClosestLocation(from, coords);

  return {
    location: place.locations[index],
    distance,
    locationCount: place.locations.length,
  };
}

/**
 * Sort places by distance from a point (nearest first)
 */
export function sortPlacesByDistance(
  places: Place[],
  from: Coordinates
): Place[] {
  return [...places].sort((a, b) => {
    const distA = getNearestLocation(a, from).distance;
    const distB = getNearestLocation(b, from).distance;
    return distA - distB;
  });
}
