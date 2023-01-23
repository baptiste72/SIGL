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

    test("Devrait créer un Centre de Formation", async () => {

      let nom_centre_formation = 'ESEO';
      let adresse_centre_formation = 'Bvd Jeanneteau';
      let code_postal_centre_formation = '49000';
      let ville_centre_formation = 'Angers';

      // Click sur le bouton du menu amenant à la page de configuration
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
      expect(await page.url()).toBe("https://projet-sigl.fr/configuration");

      // Click sur le bouton amenant à l'interface de gestion des centres de formation
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[6]').click();
      await page.waitForTimeout(1000);

      // Click sur le bouton d'ajout d'un centre de formation
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[1]/button').click();
      await page.waitForTimeout(1000);

      // Rentrée des informations dans les champs attendus
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_centre_formation);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(ville_centre_formation);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(code_postal_centre_formation);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[4]/mat-form-field/div[1]/div[2]/div/input').fill(adresse_centre_formation);
      await page.waitForTimeout(1000);
      // Clique sur le bouton de validation
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[5]/button[1]').click();
      await page.waitForTimeout(1000);

      // Vérification de la création du centre de formation
      await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[1]');
      const text = await (await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[1]')).innerText();
      expect(text.match(nom_centre_formation));
    })

    // test("Devrait modifier un Centre de Formation", async () => {
    //
    //   let nom_centre_formation = 'ESIA';
    //   let adresse_centre_formation = 'Bvd Paul Bert';
    //   let code_postal_centre_formation = '53000';
    //   let ville_centre_formation = 'Laval';
    //
    //   // Click sur le bouton du menu amenant à la page de configuration
    //   await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
    //   expect(await page.url()).toBe("https://projet-sigl.fr/configuration");
    //
    //   // Click sur le bouton amenant à l'interface de gestion des centres de formation
    //   await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[6]').click();
    //   await page.waitForTimeout(1000);
    //
    //   // Click sur le bouton de modification d'un centre de formation
    //   await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[5]/button[1]').click();
    //   await page.waitForTimeout(1000);
    //
    //   // Rentrée des informations dans les champs attendus
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_centre_formation);
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(ville_centre_formation);
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(code_postal_centre_formation);
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[4]/mat-form-field/div[1]/div[2]/div/input').fill(adresse_centre_formation);
    //   await page.waitForTimeout(1000);
    //   // Clique sur le bouton de validation
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[5]/button[1]').click();
    //   await page.waitForTimeout(1000);
    //
    //   // Vérification de la modification du centre de formation
    //   await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[1]');
    //   const text = await (await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[1]')).innerText();
    //   expect(text.match(nom_centre_formation));
    // })

    test("Devrait supprimer un Centre de Formation", async () => {

      // // Click sur le bouton du menu amenant à la page de configuration
      // await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
      // expect(await page.url()).toBe("https://projet-sigl.fr/configuration");

      // // Click sur le bouton amenant à l'interface de gestion des centres de formation
      // await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[6]').click();
      // await page.waitForTimeout(1000);

      // Click sur le bouton de suppression d'un centre de formation
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[5]/button[2]').click();
      await page.waitForTimeout(1000);

      // Click sur le bouton de confirmation
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]');
      await page.waitForTimeout(1000);

      // Vérification de la suppression du centre de formation
      let delCF = 0;
      try {
        await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[5]/button[2]');
        delCF = 0;
      } catch (e) { delCF = 1; }
      expect(delCF).toBe(1);
    })

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
