export function extractProbability(analiseIa?: string): number | null {
    if (!analiseIa) return null;
  
    const match = analiseIa.match(/probabilidade de [êe]xito[^:]*:\**\s*(\d+)%/i);
    
    if (match) return parseInt(match[1], 10);
    
    const fallback = analiseIa.match(/(\d+)%/);
    return fallback ? parseInt(fallback[1], 10) : null;
  }