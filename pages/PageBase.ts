import { Locator, Page } from '@playwright/test'
export class PageBase {

    private readonly page: Page;
    
    constructor(page: Page) {
        this.page = page;
    }

 /**
   * this method takes an array of words/titles to verify that these titles are exist in the page
   * @param {this is the exact locator that contains the text} cardsLocator 
   * @param {the array of words you want to check} wordsArray 
   */
 async assertTextExistsInCards(cardsLocator: Locator, wordsArray: string[]) {
    await this.page.waitForLoadState();
    const cardCount = await cardsLocator.count();
    // Loop through each word in wordsArray
    for (const word of wordsArray) {
      let wordFound = false;
      // Check each card for the presence of the word
      for (let i = 0; i < cardCount; i++) {
        const cardText = await cardsLocator.nth(i).textContent();
        // If the card contains the word, mark wordFound as true and break out of the loop
        if (cardText.includes(word)) {
          wordFound = true;
          break;
        }
      }
      return wordFound;
    }
  }
}