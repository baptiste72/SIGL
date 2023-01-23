import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video'

describe('Tests - Apprentis -  notes periodiques', () => {

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
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[3]');
      expect(await page.url()).toBe("https://projet-sigl.fr/notes");
      await page.waitForTimeout(500);

      // Clique sur le menu déroulant du semestre en cours
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[1]/mat-tree/mat-tree-node/button');
      await page.waitForTimeout(500);

      // Clique sur la note à modifier
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[1]/mat-tree/mat-tree-node[2]/button');
      await page.waitForTimeout(500);

      // Clique sur le bouton "Modifier la note"
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[2]/div/div/button[1]').click();

      // Remplissage du formulaire avec les nouvelles données
      // Nom de la note
      await page.waitForTimeout(2000);
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.type(nouveau_nom_note);

      // Partie déroulante semestre
      await page.waitForSelector('mat-select');
      await page.locator('mat-select').click();
      await page.waitForTimeout(1500);
      // Click sur le dropdown menu - option
      await page.waitForSelector('mat-option');
      await page.locator('mat-option').click();

      // Switch sur la partie date
      await page.keyboard.press('Tab');
      await page.keyboard.type(nouveau_date_debut);
      await page.keyboard.press('Tab');
      await page.keyboard.type(nouveau_date_fin);
      await page.waitForTimeout(1500);

      // Switch sur la partie description
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Control+A');
      await page.keyboard.press('Backspace');
      await page.keyboard.type(nouveau_description_note);

      // Validation de la modification de la note
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-add-note-popup/form/div[2]/button[1]');
      await page.waitForTimeout(1500);

      // Clique sur le menu déroulant du semestre en cours
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[1]/mat-tree/mat-tree-node/button');
      await page.waitForTimeout(1500);

      // Vérification du nom de la note
      await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[1]/mat-tree/mat-tree-node[2]/button');
      const nom_reel_note_verif = await ( await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[1]/mat-tree/mat-tree-node[2]/button')).innerText();
      expect(nom_reel_note_verif).toBe(nouveau_nom_note);

      // Click sur le bouton du menu amenenant à l'accueil
      await page.waitForTimeout(1000);
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[1]');
      expect(await page.url()).toBe("https://projet-sigl.fr/dashboard");
    })

    test("Devrait pouvoir supprimer une note périodique", async () => {
      // Suppression de la note
      // Click sur le bouton du menu amenenant aux notes
      await page.waitForTimeout(1000);
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[3]');
      expect(await page.url()).toBe("https://projet-sigl.fr/notes");
      await page.waitForTimeout(1000);

      // Clique sur le menu déroulant du semestre en cours
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[1]/mat-tree/mat-tree-node/button');
      await page.waitForTimeout(1000);

      // Clique sur la note à supprimer
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[1]/mat-tree/mat-tree-node[2]/button');
      await page.waitForTimeout(1000);

      // Clique sur le bouton supprimer de la note
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[2]/div/div/button[2]');
      await page.waitForTimeout(1000);

      // Clique sur le bouton de confirmation de la suppression
      await page.click('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]');
      await page.waitForTimeout(1000);

      // Clique sur le bouton de l'accueil
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[1]');
      await page.waitForTimeout(1000);

      // Retour sur la page de Notes
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[3]');
      await page.waitForTimeout(1000);

      // Clique sur le menu déroulant du semestre en cours
      let elemDel = 0;
      try {
        await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/div[2]/mat-card/mat-card-content/div[1]/mat-tree/mat-tree-node/button');
        elemDel = 0;
      } catch (e) { elemDel = 1; }

      await page.waitForTimeout(1000);
      expect(elemDel).toBe(1);
    })

    afterAll(async () => {
      await capture.stop();
      await page.click('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a:nth-child(7)')
      await page.waitForTimeout(1000);
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
