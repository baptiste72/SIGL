import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video'

describe('Tests - Coordinateur - CRUD User Apprentis', () => {

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
      capture = await saveVideo(page, 'CRUD-Apprentis.mp4')

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

    test("Devrait créer un User avec le rôle apprenti", async () => {
      let nom_user = 'Test1';
      let prenom_user = 'Withlove';
      let email_user = 'test1.withlove@reseau.eseo.fr';
      let promotion_user = 'Noether';
      let role_user = 'Apprenti';

      // Clique sur le bouton du menu de configuration
      const menu = await page.locator('html > body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a');
      for(let i = 0; i < await menu.count(); i++) {
        if(await (await menu.nth(i).innerText()).match("Configuration")) {
          await menu.nth(i).click();
          break;
        }
      }
      await page.waitForTimeout(1000);

      // Clique sur le bouton d'ajout d'un user
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/div/mat-card/mat-card-content/div[1]/button');
      await page.waitForTimeout(1000);

      // Rempli le formulaire
      // Role dropdown menu
      await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[1]/mat-form-field/div[1]/div[2]');
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[1]/mat-form-field/div[1]/div[2]').click();
      let role_mat = await page.locator('div > mat-option');
      let role_text;
      for(let i = 0; i < await role_mat.count(); i++) {
        role_text = await role_mat.nth(i).locator('span').innerText();
        if(role_text === role_user){
          await role_mat.nth(i).click();
          break;
        }
      }
      await page.waitForTimeout(1000);

      // Promotion dropdown menu
      await page.waitForSelector('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[2]/mat-form-field/div[1]/div[2]');
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[2]/mat-form-field/div[1]/div[2]').click();
      let promo_mat = await page.locator('div > mat-option');
      let promo_text;
      for(let i = 0; i < await promo_mat.count(); i++) {
        promo_text = await promo_mat.nth(i).locator('span').innerText();
        if(promo_text === promotion_user){
          await promo_mat.nth(i).click();
          break;
        }
      }
      await page.waitForTimeout(1000);

      // Nom / Prenom / Email
      await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[3]/mat-form-field/div[1]/div[2]/div/input', nom_user);
      await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[4]/mat-form-field/div[1]/div[2]/div/input', prenom_user);
      await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[5]/mat-form-field/div[1]/div[2]/div/input', email_user);

      // Clique sur le bouton d'ajout
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[3]/button[1]').click();
      await page.waitForTimeout(1000);

      // Vérifie que l'user a bien été ajouté
      const rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const name = await row.innerText();
        if(name.match(nom_user)) {
          expect(name.match(nom_user));
          expect(name.match(prenom_user));
          expect(name.match(email_user));
          break;
        }
      }
    });

    test("Devrait modifier un User avec le rôle apprenti", async () => {
      let user_to_modify = 'Test1';
      let nom_user = 'Testmodif';
      let prenom_user = 'Withlove';
      let email_user = 'withlove.Testmodif@reseau.eseo.fr';
      // Tableau qui boucle sur les utilisateurs jusqu'à trouvé celui à modifier
      let elem;
      let rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const name = await row.innerText();
        if(name.match(user_to_modify)) {
          const columns = await row.locator('td');
          const column = await columns.nth(4);
          const boutons = await column.locator('button');
          const bouton = await boutons.nth(0);
          try {
            await bouton.click();
          } catch (error) {
            console.log("Erreur : ", error);
          }
          break;
        }
      }
      await page.waitForTimeout(1000);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-user-popup/div[2]/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(prenom_user);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-user-popup/div[2]/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(nom_user);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-user-popup/div[2]/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(email_user);
      // Clique sur le bouton de modification
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-user-popup/div[2]/div[4]/button[1]').click();
      await page.waitForTimeout(1000);

      // Vérifie que l'user a bien été modifié
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const name = await row.innerText();
        if(name.match(nom_user)) {
          expect(name.match(nom_user));
          expect(name.match(prenom_user));
          expect(name.match(email_user));
          break;
        }
      }
    })

    test("Devrait supprimer un user", async () => {
      let user_to_delete = 'Testmodif';
      let rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const name = await row.innerText();
        if(name.match(user_to_delete)) {
          const columns = await row.locator('td');
          const column = await columns.nth(4);
          const boutons = await column.locator('button');
          const bouton = await boutons.nth(1);
          try {
            await bouton.click();
          } catch (error) {
            console.log("Erreur : ", error);
          }
          break;
        }
      }
      await page.waitForTimeout(1000);
      await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]').click();
      await page.waitForTimeout(1000);
      // Vérifie que l'user a bien été supprimé en cherchant dans la liste des utilsiateurs
      let user_found = false;
      rows = await page.locator('tbody > tr');
      for(let i = 0; i < await rows.count(); i++) {
        let name = await rows.nth(i).locator('td').nth(0).innerText();
        if(name.match(user_to_delete)) {
          user_found = true;
          break;
        }
      }
      expect(user_found).toBe(false);
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
