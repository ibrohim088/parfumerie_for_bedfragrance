export interface ScentProfileData {
  families: string[];
  notes: string[];
  intensity: 'light' | 'moderate' | 'strong';
  seasons: ('spring' | 'summer' | 'autumn' | 'winter')[];
  occasions: string[];
}
