import { Browser, BrowserContext, Page, chromium } from "playwright";

describe('Tests apprentis', () => {

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

    test("Devrait connecter l'utilisateur", async () => {
      const user = 'alexandre.nizery@reseau.eseo.fr'
      const password = 'oHO98*s1mPli'
      await page.fill('input[type="email"]', user);
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
      expect(await page.url()).toBe("https://projet-sigl.fr/dashboard-admin");

      const text = await (await page.locator('.profile')).innerText();
      console.log(text);
      expect(text.match("Alexandre NIZERY"));
    })

    test("Devrait déconnecter l'utilisateur", async () => {
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(8)')
      expect(await page.url()).toBe("https://projet-sigl.fr/login");
    })

    afterAll(async () => {
      await page.close()
      await context.close()
      await browser.close()
    })
  }
)
