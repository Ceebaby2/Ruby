import {
  w,
  percent_w,
  puts,
} from '../src/lib/top_level_methods';

describe('Top Level Methods', () => {
  describe('#w', () => {
    it('transforms words into an array', () => {
      let words = 'How does a ragtag volunteer army in need of a shower somehow defeat a global superpower?';
      let wordsArray = w(words);

      expect(wordsArray).to.eql(['How', 'does', 'a', 'ragtag', 'volunteer', 'army', 'in', 'need', 'of', 'a', 'shower', 'somehow', 'defeat', 'a', 'global', 'superpower?']);
    });

    it('takes in an optional delimater', () => {
      let words = 'How|do|we|emerge|victorious from the quagmire?|Leave|the|battlefield|waving|Betsy Ross\’ flag higher?';
      let wordsArray = w(words, { delimeter: '|' });

      expect(wordsArray).to.eql(['How', 'do', 'we', 'emerge', 'victorious from the quagmire?', 'Leave', 'the', 'battlefield', 'waving', 'Betsy Ross\’ flag higher?']);
    });
  });

  describe('#percent_w', () => {
    it('is an alias for #w', () => {
      expect(percent_w).to.eql(w);
    });
  });

  describe('#puts', () => {
    it('is an alias for console.log', () => {
      expect(puts).to.eql(console.log); // eslint-disable-line no-console
    });
  });
});
