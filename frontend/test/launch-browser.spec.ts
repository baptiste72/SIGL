import { Browser, BrowserContext, Page, chromium } from 'playwright';

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
      await page.goto("https://projet-sigl.fr/login")
    })

    test("Page en prod", async () => {
      expect(await page.title()).toBe("Projet SIGL");
    })

    afterAll(async () => {
      await page.close()
      await context.close()
      await browser.close()
    })

  }
)
