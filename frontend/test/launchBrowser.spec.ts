import { Browser, BrowserContext, Page, chromium } from "playwright";

describe('Launch Browser', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;

    beforeAll(async () => {
      browser = await chromium.launch({
          headless: true,
          executablePath: '/usr/bin/chromium-browser'
      });
      context = await browser.newContext()
      page = await context.newPage();
      await page.goto("https://projet-sigl.fr/")
    })

    test("Home Page", async () => {
      console.log(await page.title());
      expect(await page.title()).toBe("Projet SIGL");
    })

    afterAll(async () => {
      await page.close()
      await context.close()
      await browser.close()
    })

    // test('Open Letcode', async() => {
    //    // const browser = await chromium.launch();
    //    const browser = await chromium.launch({  // Or 'firefox' or 'webkit'.
    //     executablePath: '/usr/bin/chromium-browser'
    //   });
    //    const context = await browser.newContext();
    //    let page = await context.newPage();
    //    await page.goto('https://projet-sigl.fr/');
    //      // Expect a title "to contain" a substring.
    //    await expect(page).toHaveURL('https://projet-sigl.fr/')
    //    await browser.close();
    // })

}
)