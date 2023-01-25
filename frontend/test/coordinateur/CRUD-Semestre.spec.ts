import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video'

describe('Tests - Coordinateur - CRUD Semestres', () => {

    let browser: Browser;
    let context: BrowserContext;
    let page: Page;
    let capture;
    const TIMEOUT = { timeout: 5000 };

    beforeAll(async () => {
      browser = await chromium.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser'
      });

      context = await browser.newContext();
      page = await context.newPage();
      capture = await saveVideo(page, 'CRUD_Semestre.mp4')

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
        if(nom.match("Semestres")) {
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

    test("Devrait créer un Semestre", async () => {
      let nom_semestre = 'Semestre ';
      let debut_semestre = '2/15/2023';
      let fin_semestre = '3/25/2023';
      let nom_promotion_semestre = 'Noether';
      // 2 itrérations pour avoir un semestre de plus pour tester la suppression
      for(let i = 0; i < 2; i++) {
        // Clique sur le bouton d'ajout d'un semestre
        await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[1]/button');
        await page.waitForTimeout(1000);

        // Rempli le formulaire
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_semestre+i.toString());
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[1]/input').fill(debut_semestre);
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[2]/input').fill(fin_semestre);
        // Clique sur le dropdown menu
        await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[3]/mat-form-field', TIMEOUT);
        await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[3]/mat-form-field');
        let promotion_semestre = await page.locator('div > mat-option');
        let promotion_text;
        for(let i = 0; i < await promotion_semestre.count(); i++) {
          promotion_text = await promotion_semestre.nth(i).locator('span').innerText();
          if(promotion_text === nom_promotion_semestre){
            await promotion_semestre.nth(i).click();
            break;
          }
        }
        await page.waitForTimeout(1000);

        // Clique sur le bouton d'ajout
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[4]/button[1]').click();
        await page.waitForTimeout(1000);
      }

      // Vérifie que le semestre a bien été ajouté
      let found = false;
      const rows = await page.locator('tbody > tr');
      let tds = await rows.allInnerTexts();
      let td;
      // Boucle sur les td
      for(let i = 0; i < tds.length; i++) {
        td = tds[i];
        // Si le td contient le nom du semestre
        if(td.includes(nom_semestre+'1')) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    });

    // Non fonctionnel
    test("Devrait modifier un Semestre", async () => {
      let ancien_nom_semestre = 'Semestre 1';
      let nouveau_nom_semestre = 'Semestre 6';
      let debut_semestre = '3/15/2023';
      let fin_semestre = '4/25/2023';

      // Recherche le semestre à modifier et clique sur le bouton de modification
      let rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const cell_num = await row.locator('td');
        const name = await cell_num.nth(0).innerText();
        if(name === ancien_nom_semestre) {
          await rows.nth(i).locator('td').nth(3).locator('button').nth(0).click();
          break;
        }
      }
      await page.waitForTimeout(1000);

      // Rempli le formulaire
      // Partie Nom
      await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input', TIMEOUT);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nouveau_nom_semestre);
      // Partie Date de début
      await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[1]/input', TIMEOUT);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[1]/input').fill(debut_semestre);
      // Partie Date de fin
      await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[2]/input', TIMEOUT);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[2]/input').fill(fin_semestre);

      // Clique sur le bouton de modification, actuellement non fonctionnel
      try {
        await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[4]/button[1]', TIMEOUT);
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[4]/button[1]').click();
      } catch (error) {
        console.log(error);
      }
      // Comme non fonctionnel, on ferme la popup via le bouton annuler
      try {
        await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[4]/button[2]', TIMEOUT);
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[4]/button[2]').click();
      } catch (error) {
        console.log(error);
      }
      await page.waitForTimeout(1000);

      // Vérifie que le semestre a bien été modifié
      let found = false;
      rows = await page.locator('tbody > tr');
      let tds = await rows.allInnerTexts();
      let td;
      // Boucle sur les td
      for(let i = 0; i < tds.length; i++) {
        td = tds[i];
        // Si le td contient le nom du semestre
        if(td === nouveau_nom_semestre) {
          found = true;
          break;
        }
      }
      expect(found).toBe(true);
    })

    test("Devrait supprimer un Semestre", async () => {
       let nom_semestre = "Semestre 0";

       // Recherche le semestre à supprimer et clique sur le bouton de suppression
       let rows = await page.locator('tbody > tr');
       for(let i = 0; i <= await rows.count(); i++) {
         const row = await rows.nth(i);
         const cell_num = await row.locator('td');
         const name = await cell_num.nth(0).innerText();
         if(name === nom_semestre) {
           await rows.nth(i).locator('td').nth(3).locator('button').nth(1).click();
           break;
         }
       }
       await page.waitForTimeout(1000);

       // Clique sur le bouton de confirmation de suppression
       await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]', TIMEOUT);
       await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]');
       await page.waitForTimeout(1000);

       // Vérifie que le semestre a bien été modifié
       let found = false;
       rows = await page.locator('tbody > tr');
       let tds = await rows.allInnerTexts();
       // Boucle sur les td
       for(let i = 0; i < tds.length; i++) {
         let td = tds[i];
         // Si le td contient le nom du semestre
         if(td === nom_semestre) {
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
