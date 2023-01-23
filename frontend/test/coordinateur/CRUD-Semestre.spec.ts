import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video'

describe('Tests - Coordinateur - CRUD CentreFormation', () => {

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
      let debut_semestre = '2/15/2023';
      let fin_semestre = '3/25/2023';

      // Clique sur le bouton du menu de configuration
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
      await page.waitForTimeout(1000);

      // Clique sur le menu des semestres
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[5]');
      await page.waitForTimeout(1000);

      // Clique sur le bouton d'ajout d'un semestre
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[1]/button');
      await page.waitForTimeout(1000);

      // Rempli le formulaire
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_semestre);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[1]/input').fill(debut_semestre);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[2]/mat-form-field/div[1]/div[2]/div[1]/mat-date-range-input/div/div[2]/input').fill(fin_semestre);
      // Clique sur le dropdown menu
      await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[3]/mat-form-field', TIMEOUT);
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[3]/mat-form-field');
      // Clique sur le premier item du dropdown menu
      await page.waitForTimeout(1000);
      await page.locator('xpath=/html/body/div[2]/div[4]/div/div/mat-option').click();
      // Clique sur le bouton d'ajout
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-semester-popup/form/div/div[4]/button[1]').click();
      await page.waitForTimeout(1000);

      // Vérifie que le semestre a bien été ajouté
      const semestre = await (await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[1]')).innerText();
      expect(semestre.match(nom_semestre));
      let popup_semestre_add = 0;
      try {
        await page.getByText('Semestre ajouté');
        popup_semestre_add = 1;
      } catch (error) {
        console.log(error);
      }
      expect(popup_semestre_add).toBe(1);
    });

    // Non fonctionnel
    test("Devrait modifier un Semestre", async () => {
      let nom_semestre = 'Nouveau Noether';
      let debut_semestre = '3/15/2023';
      let fin_semestre = '4/25/2023';

      // Clique sur le bouton du menu de configuration
      await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]', TIMEOUT);
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
      await page.waitForTimeout(1000);

      // Clique sur le menu des semestres
      await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[5]', TIMEOUT);
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[5]');
      await page.waitForTimeout(1000);

      // Clique sur le bouton de modification d'un semestre
      await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[4]/button[1]', TIMEOUT);
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[4]/button[1]');

      // Rempli le formulaire
      // Partie Nom
      await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input', TIMEOUT);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-semester-popup/form/div/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_semestre);
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

      // Vérifie que le semestre a bien été modifié
      await page.waitForTimeout(3000);
      const ancien_nom = await (await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr[1]/td[1]')).innerText();
      expect(ancien_nom).toBe(nom_semestre);
    })

    test("Devrait supprimer un Semestre", async () => {

       // Clique sur le bouton du menu de configuration
       await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]', TIMEOUT);
       await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');
       // Clique sur le menu des semestres
       await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[5]', TIMEOUT);
       await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[5]');
       // Clique sur le bouton de modification d'un semestre
       await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[4]/button[1]', TIMEOUT);
       await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr/td[4]/button[2]');
       // Clique sur le bouton de confirmation de suppression
       await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]', TIMEOUT);
       await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]');
       await page.waitForTimeout(2000);
       // Retour accueil
       await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[1]', TIMEOUT);
       await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[1]');
       await page.waitForTimeout(1000);

      // Clique sur le bouton du menu de configuration
      await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]', TIMEOUT);
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[7]');

      // Clique sur le menu des semestres
      await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[5]', TIMEOUT);
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/mat-tab-header/div/div/div/div[5]');
      await page.waitForTimeout(1000);

       // Vérifie que le semestre n'est plus présent
       let semestreDel = 0;
       try {
         await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[5]/div/div/mat-card/mat-card-content/div[2]/table/tbody/tr', TIMEOUT);
       } catch (e) {
          semestreDel = 1;
       }
       expect(semestreDel).toBe(1);
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
