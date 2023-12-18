/**
 * @param { string } userText A block of text from the user to analyze
 * @param { number } limit The amount of results to return
 * @return { object } Word frequency data
 */
export function useWordFrequency(userText: string, limit: number = 1) {
  /**
   * @return { string[] } The words with the highest usage in the user text
   */
  function getMostUsedWords(): string[] {
    const words = userText
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Cleaning text.
      .toLowerCase() // Converting to Lowercase.
      .split(/\s+/) // Splitting words.

    const wordFrequency = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));

    const mostUsedWordArray = sortedWords.slice(0, limit).map(([word]) => word);

    return mostUsedWordArray;
  }

  /**
   * @return { string[] } The words with the lowest usage in the user text
   */
  function getLeastUsedWords(): string[] {
    const words = userText
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '') // Cleaning text.
      .toLowerCase() // Converting to Lowercase.
      .split(/\s+/) // Splitting words.

    const wordFrequency = words.reduce((acc, word) => {
      acc[word] = (acc[word] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const sortedWords = Object.entries(wordFrequency).sort((a, b) => a[1] - b[1] || a[0].localeCompare(b[0]));

    const leastUsedWordArray = sortedWords.slice(0, limit).map(([word]) => word);

    return leastUsedWordArray;
  }

  return {
    mostUsedWords: getMostUsedWords(),
    leastUsedWords: getLeastUsedWords(),
  };
}