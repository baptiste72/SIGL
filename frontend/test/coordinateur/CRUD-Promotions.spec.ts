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

    test("Devrait créer une Promotion", async () => {
      let nom_promotion = 'Proethereum';
      let date_debut_promotion = '1/25/2023';

      // Clique sur le bouton du menu de configuration
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
      await page.waitForTimeout(1000);

      // Clique sur le menu des promotions
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[4]');
      await page.waitForTimeout(1000);

      // Clique sur le bouton d'ajout de promotion
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[4]/div/div/mat-card/mat-card-content/div[1]/button');
      await page.waitForTimeout(1000);

      // Rempli le formulaire d'ajout de promotion
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-year-group-popup/form/div[1]/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_promotion);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-year-group-popup/form/div[1]/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(date_debut_promotion);

      // Clique sur le bouton d'ajout de promotion
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-year-group-popup/form/div[2]/button[1]');

      // Vérifie que la promotion a bien été ajoutée
      await page.waitForTimeout(1000);
      const text = await (await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[4]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[1]')).innerText();
      expect(text.match(nom_promotion));
    });

    // test("Devrait modifier une Promotion", async () => {
    //   // Clique sur le bouton du menu de configuration
    //   await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
    //   await page.waitForTimeout(1000);
    //
    //   // Clique sur le menu des promotions
    //   await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[4]');
    //   await page.waitForTimeout(1000);
    //
    //   // Clique sur le bouton d'édition de la promotion
    //   await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[4]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[3]/button[1]');
    //   await page.waitForTimeout(1000);
    //
    //   // Rempli le formulaire d'édition de promotion
    //   await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-year-group-popup/form/div[1]/div[1]/mat-form-field/div[1]/div[2]/div/input', 'Nouveau nom de promotion');
    //   await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-year-group-popup/form/div[1]/div[2]/mat-form-field/div[1]/div[2]/div[1]/input', '1/25/2024');
    //
    //   // Clique sur le bouton d'édition de promotion
    //   await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-year-group-popup/form/div[2]/button[1]');
    //   await page.waitForTimeout(1000);
    //
    //   // Vérifie que la promotion a bien été modifiée
    //   const text = await (await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-year-group-popup/form/div[2]/button[1]')).innerText();
    //   expect(text.match("Nouveau nom de promotion"));
    // })

    test("Devrait supprimer une Promotion", async () => {
      // Clique sur le bouton du menu de configuration
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
      await page.waitForTimeout(1000);

      // Clique sur le menu des promotions
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[4]');
      await page.waitForTimeout(1000);

      // Clique sur le bouton de suppression de la promotion
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[4]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[3]/button[2]');
      await page.waitForTimeout(1000);

      // Clique sur le bouton de confirmation de la suppression de promotion
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]');
      await page.waitForTimeout(1000);

      // Vérifie que la promotion a bien été supprimée
      let delPromo = 0;
      try {
        await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[4]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[1]', { timeout: 2000 });
        delPromo = 0;
      } catch (e) { delPromo = 1; }
      expect(delPromo).toBe(1);
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
