import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video'

describe('Tests - Coordinateur - CRUD Promotions', () => {

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
      capture = await saveVideo(page, 'CRUD_Promotions.mp4')

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
      await page.waitForTimeout(1000);

      // Clique sur le menu des promotions
      const menu_defilant = await page.locator('html > body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > mat-tab-group > mat-tab-header > div > div > div > div');
      // Boucle sur les menus défilants
      for(let i = 0; i < await menu_defilant.count(); i++) {
        // Récupération du nom du menu défilant
        let nom = await (await menu_defilant.nth(i).locator('span.mdc-tab__content > span.mdc-tab__text-label')).innerText();
        // Si le nom du menu défilant est "Promotions"
        if(nom.match("Promotions")) {
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
      await page.waitForTimeout(1000);
    });

    test("Devrait créer une Promotion", async () => {
      let nom_promotion = 'Noether';
      let date_debut_promotion = '9/7/2020';
      // On ajoute deux promotions étant donné qu'on en supprimera une, pour la suite des tests donc
      for(let i = 0; i < 2; i++) {
        // Clique sur le bouton d'ajout de promotion
        await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[4]/div/div/mat-card/mat-card-content/div[1]/button');
        await page.waitForTimeout(1000);

        // Rempli le formulaire d'ajout de promotion
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-year-group-popup/form/div[1]/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_promotion);
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-year-group-popup/form/div[1]/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(date_debut_promotion);

        // Clique sur le bouton d'ajout de promotion
        await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-year-group-popup/form/div[2]/button[1]');
      }

      // Vérifie que la promotion a bien été ajoutée (au moins une fois)
      await page.waitForTimeout(1000);
      const rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const name = await row.innerText();
        if(name.match(nom_promotion)) {
          expect(name.match(nom_promotion));
          break;
        }
      }
    });

    test("Devrait modifier une Promotion", async () => {
      let promotion_to_modify = 'Noether';
      let new_promotion_name = 'Noethelu';

      // Parcours des promotions 'tbody > tr' pour trouver la promotion à modifier
      let rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const cell_num = await row.locator('td');
        const name = await cell_num.nth(0).innerText();
        if(name.match(promotion_to_modify)) {
          // Clique sur le bouton de modification de la promotion
          await row.locator('td > button').nth(0).click();
          await page.waitForTimeout(1000);
          break;
        }
      }

      // Rempli le formulaire d'édition de promotion
      await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-year-group-popup/form/div[1]/div[1]/mat-form-field/div[1]/div[2]/div/input', new_promotion_name);
      // Clique sur le bouton d'édition de promotion Non fonctionnel
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-year-group-popup/form/div[2]/button[1]');
      await page.waitForTimeout(1000);
      // Clique sur Annuler
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-year-group-popup/form/div[2]/button[2]');
      await page.waitForTimeout(1000);

      // Vérifie que la promotion a bien été modifiée Echec du test
      let found = false;
      rows = await page.locator('tbody > tr');
      let tds = await rows.allInnerTexts();
      let td;
      // Boucle sur les td
      for(let i = 0; i < tds.length; i++) {
        td = tds[i];
        // Si le td contient le nom de la promotion
        if(td === new_promotion_name) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    })

    test("Devrait supprimer une Promotion", async () => {
      let promotion_to_delete = 'Noether';

      // Parcours du tbody pour trouver la promotion à supprimer
      let rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const cell_num = await row.locator('td');
        const name = await cell_num.nth(0).innerText();
        if(name.match(promotion_to_delete)) {
          // Clique sur le bouton de suppression de la promotion
          await row.locator('td > button').nth(1).click();
          await page.waitForTimeout(1000);
          break;
        }
      }

      // Clique sur le bouton de confirmation de la suppression de promotion
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]');
      await page.waitForTimeout(2000);

      // Vérifie que la promotion a bien été supprimée
      let found = false;
      rows = await page.locator('tbody > tr');
      let tds = await rows.allInnerTexts();
      // Boucle sur les td
      for(let i = 0; i < tds.length; i++) {
        let td = tds[i];
        // Si le td contient le nom de la promotion
        if(td === promotion_to_delete) {
          found = true;
          break;
        }
      }
      expect(found).toBe(false);
    });

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
