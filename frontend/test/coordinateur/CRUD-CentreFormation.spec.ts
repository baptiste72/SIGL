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
      capture = await saveVideo(page, 'CRUD_CDF.mp4')

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

    beforeEach(async () => {
      // Clique sur le bouton du menu de configuration
      const menu = await page.locator('html > body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a');
      for(let i = 0; i < await menu.count(); i++) {
        if(await (await menu.nth(i).innerText()).match("Configuration")) {
          await menu.nth(i).click();
          break;
        }
      }
      await page.waitForTimeout(500);

      // Clique sur le menu des cdf
      const menu_defilant = await page.locator('html > body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > mat-tab-group > mat-tab-header > div > div > div > div');
      // Boucle sur les menus défilants
      for(let i = 0; i < await menu_defilant.count(); i++) {
        // Récupération du nom du menu défilant
        let nom = await (await menu_defilant.nth(i).locator('span.mdc-tab__content > span.mdc-tab__text-label')).innerText();
        // Si le nom du menu défilant est "Promotions"
        if(nom.match("Centre de formation")) {
          // CLique sur le menu défilant
          await menu_defilant.nth(i).click();
        }
      }
    });

    afterEach(async () => {
      // Clique sur le bouton Dashboard
      const menu = await page.locator('html > body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a');
      for(let i = 0; i < await menu.count(); i++) {
        if(await (await menu.nth(i).innerText()).match("Dashboard")) {
          await menu.nth(i).click();
          break;
        }
      }
      await page.waitForTimeout(500);
    });

    test("Devrait créer un Centre de Formation", async () => {

      let nom_centre_formation = 'ESEO';
      let adresse_centre_formation = 'Bvd Jeanneteau';
      let code_postal_centre_formation = '49000';
      let ville_centre_formation = 'Angers';

      // Click sur le bouton d'ajout d'un centre de formation
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[1]/button').click();
      await page.waitForTimeout(500);

      // Rentrée des informations dans les champs attendus
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_centre_formation);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(ville_centre_formation);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(code_postal_centre_formation);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[4]/mat-form-field/div[1]/div[2]/div/input').fill(adresse_centre_formation);
      await page.waitForTimeout(500);
      // Clique sur le bouton de validation
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[5]/button[1]').click();
      await page.waitForTimeout(500);

      let nom_centre_formation2 = 'Polytech';
      let adresse_centre_formation2 = 'Bvd Jean Moulin';
      let code_postal_centre_formation2 = '75000';
      let ville_centre_formation2 = 'Paris';

      // Click sur le bouton d'ajout d'un centre de formation
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[6]/div/div/mat-card/mat-card-content/div[1]/button').click();
      await page.waitForTimeout(500);

      // Rentrée des informations dans les champs attendus
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_centre_formation2);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(ville_centre_formation2);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(code_postal_centre_formation2);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[4]/mat-form-field/div[1]/div[2]/div/input').fill(adresse_centre_formation2);
      await page.waitForTimeout(500);

      // Clique sur le bouton de validation
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-formation-center-popup/form/div/div[5]/button[1]').click();
      await page.waitForTimeout(500);

      // Vérification de la création du centre de formation
      await page.waitForTimeout(500);
      const rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const name = await row.innerText();
        if(name.match(nom_centre_formation)) {
          expect(name.match(nom_centre_formation));
          expect(name.match(ville_centre_formation));
          expect(name.match(code_postal_centre_formation));
          expect(name.match(adresse_centre_formation));
          break;
        }
      }
    })

    test("Devrait modifier un Centre de Formation", async () => {
      let ancien_nom_cdf = 'ESEO';
      let nouveau_nom_cdf = 'ESIA';
      let adresse_centre_formation = 'Bvd Paul Bert';
      let code_postal_centre_formation = '53000';
      let ville_centre_formation = 'Laval';

      // Recherche le CDF à modifier et clique sur le bouton de modification
      let rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const cell_num = await row.locator('td');
        const name = await cell_num.nth(0).innerText();
        if(name === ancien_nom_cdf) {
          await rows.nth(i).locator('td').nth(4).locator('button').nth(0).click();
          break;
        }
      }
      await page.waitForTimeout(1000);

      // Rentrée des informations dans les champs attendus
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nouveau_nom_cdf);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(ville_centre_formation);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(code_postal_centre_formation);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[4]/mat-form-field/div[1]/div[2]/div/input').fill(adresse_centre_formation);
      await page.waitForTimeout(1000);

      // Clique sur le bouton de validation Non fonctionnel
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[5]/button[1]').click();
      await page.waitForTimeout(1000);

      // Clique donc sur le bouton annuler
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-formation-center-popup/form/div/div[5]/button[2]').click();

      // Vérification de la modification du centre de formation
      let found = false;
      rows = await page.locator('tbody > tr');
      let tds = await rows.allInnerTexts();
      let td;
      // Boucle sur les td
      for(let i = 0; i < tds.length; i++) {
        td = tds[i];
        // Si le td contient le nom du cdf
        if(td === nouveau_nom_cdf) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    })

    test("Devrait supprimer un Centre de Formation", async () => {
      let nom_centre_formation = 'ESEO';
      // Recherche le CDF à supprimer et clique sur le bouton de suppression
      let rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const cell_num = await row.locator('td');
        const name = await cell_num.nth(0).innerText();
        if(name === nom_centre_formation) {
          await rows.nth(i).locator('td').nth(4).locator('button').nth(1).click();
          break;
        }
      }
      await page.waitForTimeout(500);

      // Click sur le bouton de confirmation
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]');
      await page.waitForTimeout(500);

      // Vérification de la suppression du centre de formation
      let found = false;
      rows = await page.locator('tbody > tr');
      let tds = await rows.allInnerTexts();
      let td;
      // Boucle sur les td
      for(let i = 0; i < tds.length; i++) {
        td = tds[i];
        // Si le td contient le nom du cdf
        if(td === nom_centre_formation) {
          found = true;
          break;
        }
      }
      expect(found).toBe(false);
    })

    afterAll(async () => {
      await capture.stop();
      // Clique sur le bouton du menu Déconnexion
      const menu = await page.locator('html > body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a');
      for(let i = 0; i < await menu.count(); i++) {
        if(await (await menu.nth(i).innerText()).match("Déconnexion")) {
          await menu.nth(i).click();
          break;
        }
      }
      await page.waitForTimeout(1000);
      expect(await page.url()).toBe("https://projet-sigl.fr/login");
      await page.close();
      await context.close();
      await browser.close();
    })
  }
)
