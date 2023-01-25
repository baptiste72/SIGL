import { Browser, BrowserContext, Page, chromium } from 'playwright';
import { saveVideo } from 'playwright-video';
import usersEntreprise from './usersEntreprise.json';

describe('Tests - Compte Entreprise - CRUD Entreprise', () => {
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
      capture = await saveVideo(page, 'CRUD_Entreprise_fixtures.mp4')
    })

    test("Devrait créer une entreprise via le compte approprié", async () => {
      // Variables qui seront utilisées pour créer l'entreprise
      interface user_compte_entreprise {
        nom: string,
        prenom: string,
        email: string,
      }
      const result_users: user_compte_entreprise[] = [];

      usersEntreprise.forEach(element => {
        let newUser: user_compte_entreprise = {
          nom: element.nom,
          prenom: element.prenom,
          email: element.email,
        };
        result_users.push(newUser);
      });

      interface company {
        nom_entreprise: string;
        N_SIRET: string;
        nbr_salaries: string;
        code_idcc: string;
        convention_collective: string;
        code_NAF: string;
        secteur_activite: string;
        telephone: string;
        email_principal: string;
        adresse: string;
        code_libelle: string;
      }
      const result: company[] = [];

      usersEntreprise.forEach(element => {
        let newCompany: company = {
          N_SIRET: element.pk.toString(),
          nom_entreprise: element.cmp_name,
          nbr_salaries: element.cmp_employees.toString(),
          code_idcc: element.cmp_idcc.toString(),
          convention_collective: element.cmp_convention,
          code_NAF: element.cmp_naf_ape,
          secteur_activite: element.cmp_work_field,
          telephone: element.cmp_phone.toString(),
          email_principal: element.cmp_email,
          adresse: element.cmp_address,
          code_libelle: "1234"
        };
        result.push(newCompany);
      });

      // Boucle sur les result_user
      for (let i = 0; i < result_users.length; i++) {
          await page.goto("https://projet-sigl.fr/");
          const user = 'simon.menard@reseau.eseo.fr';
          const password = 'oHO98*s1mPli';
          await page.fill('input[type="email"]', result_users[i].email);
          await page.fill('input[name="password"]', 'oHO98*s1mPli');
          await page.click('button[type="submit"]');
          await page.waitForNavigation();

          // Clique sur le bouton du menu Informations Entreprise
          const menu = await page.locator('html > body > app-root > ng-component > app-navigation > mat-drawer-container > mat-drawer > div > div > a');
          for (let i = 0; i < await menu.count(); i++) {
            if (await (await menu.nth(i).innerText()).match("Informations Entreprise")) {
              await menu.nth(i).click();
              break;
            }
          }

          // Validation de la checkbox "Lu et approuvé"
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[12]/mat-radio-group/mat-radio-button/div/div/input').click();
          await page.waitForTimeout(1000);

          // Parcourir les entreprises

          // Si on trouve une entreprise avec le même email
          await page.waitForTimeout(1000);
          // Remplissage du formulaire
          // Nom de l'entreprise
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].nom_entreprise);

          // Numéro de SIRET
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].N_SIRET);

          // Nombre de salariés
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].nbr_salaries);

          // Code libellé
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[4]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].code_libelle);

          // Code IDCC
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[5]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].code_idcc.toString());

          // Convention collective
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[6]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].convention_collective);

          // Code NAF
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[7]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].code_NAF);

          // Secteur d'activité
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[8]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].secteur_activite);

          // Téléphone
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[9]/mat-form-field/div[1]/div[2]/div/input').fill("0" + result[i].telephone);

          // Email principal
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[10]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].email_principal);

          // Adresse
          await page.locator('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[11]/mat-form-field/div[1]/div[2]/div/input').fill(result[i].adresse);

          // Validation du formulaire
          await page.click('#cdk-step-content-0-0 > form > div.mat-mdc-dialog-actions.mdc-dialog__actions.mat-mdc-dialog-actions-align-end > button.green.bold');

          // Déconnexion de l'utilisateur
          // Clique sur le bouton du menu Déconnexion
          for(let i = 0; i < await menu.count(); i++) {
            if(await (await menu.nth(i).innerText()).match("Déconnexion")) {
              await menu.nth(i).click();
              break;
            }
          }
          await page.waitForTimeout(1000);
      }

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
      await page.close();
      await context.close();
      await browser.close();
    })
  }
)
