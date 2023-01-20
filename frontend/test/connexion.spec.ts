import { Browser, BrowserContext, Page, chromium } from 'playwright';

describe('Connexion User', () => {

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

    test("Devrait connecter l'utilisateur", async () => {
      const user = 'contact@projet-sigl.fr'
      const password = 'oHO98*s1mPli'
      await page.focus('input[type="email"]');
      await page.fill('input[type="email"]', user);
      await page.press('input[type="email"]', 'Tab');
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();

      expect(await page.url()).toBe("https://projet-sigl.fr/dashboard-admin");

      const text = await (await page.locator('.profile')).innerText();

      //console.log(text);
      expect(text.match("Admin SIGL"));
    })

    test("Devrait déconnecter l'utilisateur", async () => {
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(8)')
      await page.waitForNavigation();
      expect(await page.url()).toBe("https://projet-sigl.fr/login");
    })

    afterAll(async () => {
      await page.close()
      await context.close()
      await browser.close()
    })
  }
)
