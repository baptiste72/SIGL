import { Browser, BrowserContext, Page, chromium } from 'playwright';

describe('Tests apprentis', () => {

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
      await page.goto("https://projet-sigl.fr/")
    })

    test("Devrait connecter l'utilisateur", async () => {
      const user = 'alexandre.nizery@reseau.eseo.fr'
      const password = 'oHO98*s1mPli'
      await page.fill('input[type="email"]', user);
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
      expect(await page.url()).toBe("https://projet-sigl.fr/dashboard");
      const dashboardName = await (await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > div > h1')).innerText();
      expect(dashboardName.match("Dashboard Apprenti"));
      const text = await (await page.locator('.profile')).innerText();
      expect(text.match("Alexandre NIZERY"));
    })

    test("Devrait pouvoir créer une note périodique", async () => {
      // Définition des variables de la note
      const nom_note = 'Note de test';
      const description_note = 'Description de la note de test';
      const date_debut = '2021-01-01';
      const date_fin = '2021-12-31';

      // Création de la note
      // Click sur le bouton du menu amenenant aux notes
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(3) > div');
      expect(await page.url()).toBe("https://projet-sigl.fr/notes");

      // Click sur le bouton "Créer une note"
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > button');
      await page.waitForSelector('body > div.cdk-overlay-container');
      // const elem = await page.locator('body > div.cdk-overlay-container');
      // await elem.waitForElementState('visible');

      // Remplissage du formulaire
      // Nom de la note
      await page.locator('#mat-input-2').fill(nom_note);
      // Click sur le selecteur du semestre correspondant à la note

      // await page.waitForFunction(selector => !!document.querySelector(selector), selector);
      // const dropdown = await page.locator(selector);
      // console.log(dropdown.toString());
      // await dropdown.click();

      // await page.click(selector);
      // const select = await page.locator('mat-select');
      // await select.click();
      // await page.click('#mat-mdc-dialog-1');
      // CA MAAAAAAARCHE
      await page.waitForSelector('body > div.cdk-overlay-container');
      await page.waitForSelector('mat-select');
      await page.locator('mat-select').click();
      // let elem = await page.locator('#mat-mdc-dialog-1');
      // console.log(elem.toString());
      // await elem.click();

      // const options = await select.locator('mat-option');
      // await options.click();

      // Récupération du nom du semestre
      await page.waitForSelector('mat-select');
      
      const semestre_note = await (await page.locator('#mat-option-43 > span')).innerText();
      // Click sur le bouton du semestre correspondant à la note
      await page.click('#cdk-overlay-11');
      // Switch sur la partie date
      await page.keyboard.press('Tab');
      await page.keyboard.type(date_debut);
      await page.keyboard.press('Tab');
      await page.keyboard.type(date_fin);
      // Switch sur la partie description
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.type(description_note);

      // Validation de la création de la note
      await page.click('#mat-mdc-dialog-0 > div > div > app-add-note-popup > form > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button.green.bold');

      // Vérification de la création de la note
      const element = await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node > button > button');
      expect(element).toBeTruthy();

      // Click sur la note créée
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node > button > button');

      // Vérification du nom de la note
      const nom_reel_note = await ( await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node:nth-child(2) > button')).innerText();
      expect(nom_reel_note).toBe(nom_note);
    })

    // test("Devrait déconnecter l'utilisateur", async () => {
    //   await page.waitForSelector('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(7) > div');
    //   await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(7) > div');
    //   await page.waitForNavigation();
    //   expect(await page.url()).toBe("https://projet-sigl.fr/login");
    // })

    afterAll(async () => {
      await page.close()
      await context.close()
      await browser.close()
    })
  }
)
