import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video'

describe('Tests - Compte Entreprise - CRUD Entreprise', () => {

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
      const user = 'simon.menard@reseau.eseo.fr'
      const password = 'oHO98*s1mPli'
      await page.fill('input[type="email"]', user);
      await page.fill('input[name="password"]', password);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
      expect(await page.url()).toBe("https://projet-sigl.fr/dashboard-company");
      const dashboardName = await (await page.locator('body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer-content > div.navigation-content > div > h1')).innerText();
      expect(dashboardName.match("Dashboard Entreprise"));
    })

    test("Devrait créer une entreprise via le compte approprié", async () => {
      // Variables qui seront utilisées pour créer l'entreprise
      let nom_entreprise = 'adapei';
      let N_SIRET = '12345678912345';
      let nbr_salaries = '10';
      let code_libelle = '1234';
      let code_idcc = '1234567';
      let convention_collective = 'LALALALAL';
      let code_NAF = 'LALALALA';
      let secteur_activite = 'medico social';
      let telephone = '0606060606';
      let email_principal = 'email@adapei49.asso.fr';
      let adresse = '126 rue Saint-Leonard';

      // Clique sur le bouton du menu Informations Entreprise
      const menu = await page.locator('html > body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a');
      for(let i = 0; i < await menu.count(); i++) {
        if(await (await menu.nth(i).innerText()).match("Informations Entreprise")) {
          await menu.nth(i).click();
          break;
        }
      }
      await page.waitForTimeout(1000);

      // Remplissage du formulaire
      // Nom de l'entreprise
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(nom_entreprise);

      // Numéro de SIRET
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(N_SIRET);

      // Nombre de salariés
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(nbr_salaries);

      // Code libellé
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[4]/mat-form-field/div[1]/div[2]/div/input').fill(code_libelle);

      // Code IDCC
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[5]/mat-form-field/div[1]/div[2]/div/input').fill(code_idcc);

      // Convention collective
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[6]/mat-form-field/div[1]/div[2]/div/input').fill(convention_collective);

      // Code NAF
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[7]/mat-form-field/div[1]/div[2]/div/input').fill(code_NAF);

      // Secteur d'activité
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[8]/mat-form-field/div[1]/div[2]/div/input').fill(secteur_activite);

      // Téléphone
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[9]/mat-form-field/div[1]/div[2]/div/input').fill(telephone);

      // Email principal
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[10]/mat-form-field/div[1]/div[2]/div/input').fill(email_principal);

      // Adresse
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[11]/mat-form-field/div[1]/div[2]/div/input').fill(adresse);

      // Validation de la checkbox "Lu et approuvé"
      await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[12]/mat-radio-group/mat-radio-button/div/div/input').click();
      await page.waitForTimeout(1000);

      // Validation du formulaire
      await page.click('#cdk-step-content-0-0 > form > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button.green.bold');

      // Validation de la création de l'entreprise
      let popup_exist = 0;
      try {
        await page.getByText('Données sauvegardées');
        popup_exist = 1;
      } catch (error) {
        popup_exist = 0;
        console.log('Erreur : ', error);
      }
      expect(popup_exist).toBe(1);
      await page.waitForTimeout(5000);
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
