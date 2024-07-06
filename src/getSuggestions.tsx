// src/getSuggestions.tsx
import axios from 'axios';

export const getSuggestions = async (input: string): Promise<string[]> => {
  if (input.length === 0) {
    return [];
  }
  try {
    // Utilizamos "sl=" en lugar de "sp=" para sugerir palabras similares
    const response = await axios.get(`https://api.datamuse.com/words?sl=${input}&v=es`);
    return response.data.slice(0, 3).map((wordObj: any) => wordObj.word);
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    return [];
  }
};
