import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video'

describe('Tests - Coordinateur - CRUD CentreFormation', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let capture;

    beforeAll(async () => {
      browser = await chromium.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser'
      });

      context = await browser.newContext();
      page = await context.newPage();
      capture = await saveVideo(page, 'recording.mp4')

      await page.goto("https://projet-sigl.fr/")
      const user = 'contact@projet-sigl.fr'
      const password = 'oHO98*s1mPli'
      await page.fill('input[type="email"]', user);
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
      expect(await page.url()).toBe("https://projet-sigl.fr/dashboard-admin");
      const dashboardName = await (await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > div > h1')).innerText();
      expect(dashboardName.match("Dashboard Administrateur"));
      const text = await (await page.locator('.profile')).innerText();
      expect(text.match("Admin SIGL"));
    })

    test("Devrait créer un Semestre", async () => {
      let nom_semestre = 'Proethereum';
      let periode_semestre = '1/25/2023';

      // Clique sur le bouton du menu de configuration
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
      await page.waitForTimeout(1000);

      // Clique sur le menu des promotions
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[5]');
      await page.waitForTimeout(1000);

      // Clique sur le bouton d'ajout d'un semestre
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[1]/button');
      await page.waitForTimeout(1000);

      // Rempli le formulaire
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_semestre);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[1]/input').fill(periode_semestre);
      // Clique sur le dropdown menu
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[3]/mat-form-field/div[1]/div[2]').click();
      // Clique sur le premier item du dropdown menu
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[3]/mat-form-field/div[1]/div[2]/div[3]/mat-option[1]').click();
      // Clique sur le bouton d'ajout
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[4]/button[1]').click();
      await page.waitForTimeout(1000);

    });

    test("Devrait modifier un Semestre", async () => {

    })

    test("Devrait supprimer un Semestre", async () => {

    });

    afterAll(async () => {
      await capture.stop();
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(7)')
      await page.waitForTimeout(1000);
      expect(await page.url()).toBe("https://projet-sigl.fr/login");
      await page.close();
      await context.close();
      await browser.close();
    })
  }
)
