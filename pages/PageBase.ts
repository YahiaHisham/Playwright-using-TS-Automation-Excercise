import { Locator, Page } from '@playwright/test'
export class PageBase {

  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * This method takes an array of words/titles to verify that these titles exist in the page.
   * @param cardsLocator {Locator} The exact locator that contains the text.
   * @param wordsArray {string[]} The array of words you want to check.
   */
  async assertTextExistsInCards(cardsLocator: Locator, wordsArray: string[]): Promise<boolean> {
    await this.page.waitForLoadState('domcontentloaded');
    const cardCount = await cardsLocator.count();
    // Loop through each word in wordsArray
    for (const word of wordsArray) {
      let wordFound = false;
      // Check each card for the presence of the word
      for (let i = 0; i < cardCount; i++) {
        const cardText = await cardsLocator.nth(i).textContent();
        if (cardText && cardText.includes(word)) {
          wordFound = true;
          break; // No need to check other cards for this word
        }
      }
      // If the word was not found in any card, return false immediately
      if (!wordFound) {
        return false;
      }
    }
    // If all words were found in the cards, return true
    return true;
  }

}