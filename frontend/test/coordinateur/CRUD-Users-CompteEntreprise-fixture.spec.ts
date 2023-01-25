import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video';
import master from './master.json';

describe('Tests - Coordinateur - CRUD User Compte Entreprise', () => {

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
      capture = await saveVideo(page, 'CRUD_CompteEntreprise.mp4')

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

    test("Devrait créer un User avec le rôle Compte Entreprise", async () => {
      interface user_compte_entreprise {
        nom: string,
        prenom: string,
        email: string,
      }
      const result: user_compte_entreprise[] = [];

      master.forEach(element => {
        let newUser: user_compte_entreprise = {
          nom: element.nom,
          prenom: element.prenom,
          email: element.email,
        };
        result.push(newUser);
      });

      for (let i = 0; i < result.length; i++) {

        // Clique sur le bouton d'ajout d'un user
        await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/div/mat-card/mat-card-content/div[1]/button');
        await page.waitForTimeout(1000);

        // Rempli le formulaire
        // Role dropdown menu
        await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[1]/mat-form-field/div[1]');
        await page.waitForTimeout(1000);
        // Remplissage d'un tableau d'éléments mat-option
        let options = await page.locator('div > mat-option');
        // Parcours du tableau
        for (let i = 0; i < await options.count(); i++) {
          // Récupération du texte de l'élément
          const text = await (await options.nth(i)).innerText();
          // Si le texte correspond à l'élément recherché
          if (text === 'Compte Entreprise') {
            // Clique sur l'élément
            await (await options.nth(i)).click();
            break;
          }
        }

        // Nom / Prenom / Email
        await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[2]/mat-form-field/div[1]/div[2]/div/input', result[i].nom);
        await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[3]/mat-form-field/div[1]/div[2]/div/input', result[i].prenom);
        await page.fill('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[2]/div[4]/mat-form-field/div[1]/div[2]/div/input', result[i].email);

        // Clique sur le bouton d'ajout
        await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-user-popup/div[3]/button[1]').click();
        await page.waitForTimeout(1000);
      }
      // Vérifie que l'user a bien été ajouté
      const rows = await page.locator('tbody > tr');
      for(let i = 0; i <= await rows.count(); i++) {
        const row = await rows.nth(i);
        const name = await row.innerText();
        if(name.match(result[0].nom)) {
          expect(name.match(result[0].nom));
          expect(name.match(result[0].prenom));
          expect(name.match(result[0].email));
          break;
        }
      }
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
