import { assert, describe, expect, it } from 'vitest';
import { useWordFrequency } from '../useWordFrequency';

describe('useWordFrequency acceptance criteria', () => {
  const userText =
    'The Time Traveller (for so it will be convenient to speak of him) was expounding a recondite matter to us. His pale grey eyes shone and twinkled, and his usually pale face was flushed and animated. The fire burnt brightly, and the soft radiance of the incandescent lights in the lilies of silver caught the bubbles that flashed and passed in our glasses. Our chairs, being his patents, embraced and caressed us rather than submitted to be sat upon, and there was that luxurious after-dinner atmosphere, when thought runs gracefully free of the trammels of precision. And he put it to us in this way—marking the points with a lean forefinger—as we sat and lazily admired his earnestness over this new paradox (as we thought it) and his fecundity.';

  describe('getting the most frequently used words', () => {
    it('returns an array with the most frequently used word', () => {
      // 'and' is most frequently used in the userText variable above, used 10 times
      const { mostUsedWords } = useWordFrequency(userText);
      assert.equal(mostUsedWords[0], 'and');
    });

    it('returns an array with multiple results when passed a limit', () => {
      const { mostUsedWords } = useWordFrequency(userText, 3);
      assert.equal(mostUsedWords.length, 3);
    });

    it('uses alphabetical sorting to return results when more than one word has the same frequency', () => {
      const easyText = 'the and the and test best';
      const { mostUsedWords } = useWordFrequency(easyText, 4);
      assert.equal(mostUsedWords[0], 'and');
      assert.equal(mostUsedWords[1], 'the');
      assert.equal(mostUsedWords[2], 'best');
      assert.equal(mostUsedWords[3], 'test');
    });

    it('does not treat captilization differences as different words', () => {
      const { mostUsedWords } = useWordFrequency(userText, 2000);
      expect(mostUsedWords).toContain('the');
      expect(mostUsedWords).not.toContain('The');
    });

    it('does not return punction in the word list', () => {
      const { mostUsedWords } = useWordFrequency(userText, 2000);
      expect(mostUsedWords).toContain('glasses');
      expect(mostUsedWords).not.toContain('glasses.');
    });
  });

  describe('getting the least frequently used words', () => {
    it('returns an array with the least frequently used word', () => {
      // 'admired' is the first alphabetical word used only once
      const { leastUsedWords } = useWordFrequency(userText);
      assert.equal(leastUsedWords[0], 'admired');
    });

    it('returns an array with multiple results when passed a limit', () => {
      const { leastUsedWords } = useWordFrequency(userText, 5);
      assert.equal(leastUsedWords.length, 5);
    });

    it('uses alphabetical sorting to return results when more than one word has the same frequency', () => {
      const easyText = 'the and the and test best';
      const { leastUsedWords } = useWordFrequency(easyText, 4);
      assert.equal(leastUsedWords[0], 'best');
      assert.equal(leastUsedWords[1], 'test');
      assert.equal(leastUsedWords[2], 'and');
      assert.equal(leastUsedWords[3], 'the');
    });
  });
});
