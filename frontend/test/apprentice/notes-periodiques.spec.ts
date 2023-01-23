import { Browser, BrowserContext, Page, chromium } from 'playwright';

describe('Tests - Apprentis -  notes periodiques', () => {

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
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(3)');
      expect(await page.url()).toBe("https://projet-sigl.fr/notes");

      // Click sur le bouton "Créer une note"
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > button');
      await page.waitForSelector('body > div.cdk-overlay-container');

      // Remplissage du formulaire
      // Nom de la note
      await page.locator('#mat-input-2').fill(nom_note);

      // Click sur le dropdown menu
      await page.waitForSelector('body > div.cdk-overlay-container');
      await page.waitForSelector('mat-select');
      await page.locator('mat-select').click();

      // Click sur le dropdown menu - option
      await page.waitForSelector('mat-option');
      await page.locator('mat-option').click();
      //Récupération du nom du semestre choisis dans le dropdown menu
      const semestre_note = await (await page.locator('mat-option')).innerText();

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

      // Click sur le bouton du menu amenenant à l'accueil
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(1)');
      expect(await page.url()).toBe("https://projet-sigl.fr/dashboard");
    })

    test("Devrait pouvoir modifier une note périodique", async () => {
      // Définition des variables de la note
      const nouveau_nom_note = "Note de test V3 editing";
      const nouveau_description_note = 'Description de la note de test V3 editing';
      const nouveau_date_debut = '2021-03-01';
      const nouveau_date_fin = '2021-06-01';

      // Midification de la note
      // Click sur le bouton du menu amenenant aux notes
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(3)');
      expect(await page.url()).toBe("https://projet-sigl.fr/notes");
      wait(3000);

      // Clique sur le menu déroulant du semestre en cours
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node > button');
      wait(1500);

      // Clique sur la note à modifier
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node:nth-child(2) > button');
      wait(1500);

      // Clique sur le bouton "Modifier la note"
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.note-card-div > div > div > button.btn-modify-note.green.ng-star-inserted');
      wait(1500);

      // Remplissage du formulaire avec les nouvelles données
      // Nom de la note
      const nom_note = await (await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node:nth-child(2) > button')).innerText();
      console.log(nom_note);
      await page.keyboard.down('Shift');
      for (let i = 0; i < nom_note.length; i++)
        await page.keyboard.press('ArrowLeft');
      await page.keyboard.up('Shift');
      await page.keyboard.press('Backspace');
      wait(500);
      await page.keyboard.type(nouveau_nom_note);
      // await input.keyboard.press('Delete');
      // await input.fill(nouveau_nom_note);
      // await page.locator('#mat-input-2').fill(nouveau_nom_note);
      // wait(500);

      wait(1500);

      // Switch sur la partie date
      await page.fill('#mat-date-range-input-1 > div > div:nth-child(1) > input', nouveau_date_debut);
      await page.fill('#mat-date-range-input-1 > div > div.mat-date-range-input-wrapper.mat-date-range-input-end-wrapper > input', nouveau_date_fin);
      wait(1500);

      // Switch sur la partie description
      await page.keyboard.press('Tab');
      await page.keyboard.press('Control+KeyA');
      await page.keyboard.down('Delete');
      await page.keyboard.type(nouveau_description_note);
      wait(1500);

      // Validation de la modification de la note
      await page.click('#mat-mdc-dialog-1 > div > div > app-add-note-popup > form > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button.green.bold', {force: true});
      wait(3000);

      // Clique sur le menu déroulant du semestre en cours
      await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node > button');
      wait(3000);

      // Vérification du nom de la note
      await page.waitForSelector('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node:nth-child(2) > button');
      const nom_reel_note_verif = await ( await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node:nth-child(2) > button')).innerText();
      expect(nom_reel_note_verif).toBe(nouveau_nom_note);

      // Click sur le bouton du menu amenenant à l'accueil
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(1)');
      wait(3000);
      expect(await page.url()).toBe("https://projet-sigl.fr/dashboard");
    })

    // test("Devrait pouvoir supprimer une note périodique", async () => {
    //   // Suppression de la note
    //   // Click sur le bouton du menu amenenant aux notes
    //   await page.goto("https://projet-sigl.fr/notes", { waitUntil: 'networkidle' });
    //   expect(await page.url()).toBe("https://projet-sigl.fr/notes");
    //
    //   // Clique sur le menu déroulant du semestre en cours
    //   await page.waitForSelector('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node > button');
    //   await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node > button').click();
    //   wait(3000);
    //
    //   // Clique sur la note éditée à vérifier
    //   await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node:nth-child(2)').click();
    //   wait(3000);
    //
    //   // Clique sur le bouton supprimer de la note
    //   await page.waitForSelector('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.note-card-div > div > div > button.btn-delete-note.red.ng-star-inserted');
    //   await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.note-card-div > div > div > button.btn-delete-note.red.ng-star-inserted').click();
    //   wait(2000);
    //
    //   // Clique sur le bouton de confirmation de la suppression
    //   await page.waitForSelector('#mat-mdc-dialog-0 > div > div > app-confirm-delete > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button.green.bold');
    //   await page.locator('#mat-mdc-dialog-0 > div > div > app-confirm-delete > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button.green.bold').click();
    //   await page.click('#mat-mdc-dialog-0 > div > div > app-confirm-delete > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button.green.bold');
    //
    //   wait(3000);
    //
    //   // Vérification de la suppression de la note
    //   const element = await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > mat-card > mat-card-content > div.tree-div > mat-tree > mat-tree-node:nth-child(2) > button');
    //   expect(element).not.toBeTruthy();
    // })

    afterAll(async () => {
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(7)')
      await page.waitForNavigation();
      expect(await page.url()).toBe("https://projet-sigl.fr/login");
      await page.close()
      await context.close()
      await browser.close()
    })
  }
)

async function wait(time) {
  return new Promise(function(resolve) {
    setTimeout(resolve, time)
  });
}
