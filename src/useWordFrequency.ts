/**
 * @param { string } userText A block of text from the user to analyze
 * @return { object } Word frequency data
 */
export function useWordFrequency(userText: string, limit: number = 1) {
  /**
   * @param { number } limit The amount of results to return
   * @return { string[] } The words with the highest usage in the user text
   */
  function getMostUsedWords(limit: number): string[] {
    // Strips punctuation and converts to lowercase
    const cleanText = userText
      .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
      .toLowerCase();

    // Splits words into array
    const words = cleanText.split(/\s+/);

    // Frequency of Words
    const wordFrequency = {};
    words.forEach((word) => {
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });

    let mostUsedWord;
    let highestWordFrequency = 0;
    let leastUsedWord;

    for (const word in wordFrequency) {
      if (wordFrequency[word] > highestWordFrequency) {
        mostUsedWord = word;
        highestWordFrequency = wordFrequency[word];
      }
    }

    const testArray = [mostUsedWord];
    console.log('Words: ', mostUsedWord);

    return testArray;
  }

  /**
   * @param { number } limit The amount of results to return
   * @return { string[] } The words with the lowest usage in the user text
   */
  function getLeastUsedWords(limit: number): string[] {
    return [];
  }

  return {
    mostUsedWords: getMostUsedWords(limit),
    leastUsedWords: getLeastUsedWords(limit),
  };
}
