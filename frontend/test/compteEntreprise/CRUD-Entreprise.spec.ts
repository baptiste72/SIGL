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
      const text = await (await page.locator('.profile')).innerText();
      expect(text.match("Simon MENARD"));
    })

    test("Devrait créer une entreprise via le compte approprié", async () => {
      // Variables qui seront utilisées pour créer l'entreprise
      let nom_entreprise = 'ADAPEI49';
      let N_SIRET = '12345678912345';
      let nbr_salaries = '10';
      let code_libelle = '1234';
      let code_idcc = '1234567';
      let convention_collective = 'LALALALAL';
      let code_NAF = 'LALALALA';
      let secteur_activite = 'medico-social';
      let telephone = '0606060606';
      let email_principal = 'email@adapei49.asso.fr';
      let adresse = '126 rue Saint-Léonard';

      // Clique sur le bouton "Informations Entreprise"
      await page.waitForSelector('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[2]', TIMEOUT);
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer/div/div/a[2]');

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

      // Validation du formulaire
      await page.waitForTimeout(5000);
      const form = await page.locator('form');

      // Parcours des 2 boutons
      await page.click('xpath=/html/body/app-root/ng-component/app-navigation/mat-drawer-container/mat-drawer-content/mat-tab-group/div/mat-tab-body[1]/div/mat-card/mat-card-content/app-add-company-form/mat-card/mat-stepper/div/div[2]/div[1]/form/div[13]/button[2]');
      // const boutons = await form.locator('div > button');
      // const boutonSave = await boutons.nth(1);
      //
      // console.log('Bouton Save : ' + boutonSave);
      // await boutonSave.click();
      // for (let i = 0; i < await boutons.count(); i++) {
      //   const text = await (boutons.nth(i)).innerText();
      //   console.log(text);
      //   if (text === 'SAUVEGARDER') {
      //     await boutons.nth(i).click();
      //     break;
      //   }
      // }

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
    });

    // test("Devrait modifier un User avec le rôle apprenti", async () => {
    //   let user_to_modify = 'PLOT';
    //   let nom_user = 'PLOTOB';
    //   let prenom_user = 'Mathieure';
    //   let email_user = 'mathieure.plotob@reseau.eseo.fr';
    //   // Tableau qui boucle sur les utilisateurs jusqu'à trouvé celui à modifier
    //   let elem;
    //   let rows = await page.locator('tbody > tr');
    //   for(let i = 0; i <= await rows.count(); i++) {
    //     const row = await rows.nth(i);
    //     const name = await row.innerText();
    //     if(name.match(user_to_modify)) {
    //       const columns = await row.locator('td');
    //       const column = await columns.nth(4);
    //       const boutons = await column.locator('button');
    //       const bouton = await boutons.nth(0);
    //       try {
    //         await bouton.click();
    //       } catch (error) {
    //         console.log("Erreur : ", error);
    //       }
    //       break;
    //     }
    //   }
    //   await page.waitForTimeout(1000);
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-user-popup/div[2]/div[1]/mat-form-field/div[1]/div[2]/div/input').fill(prenom_user);
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-user-popup/div[2]/div[2]/mat-form-field/div[1]/div[2]/div/input').fill(nom_user);
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-user-popup/div[2]/div[3]/mat-form-field/div[1]/div[2]/div/input').fill(email_user);
    //   // Clique sur le bouton de modification
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-update-user-popup/div[2]/div[4]/button[1]').click();
    //   await page.waitForTimeout(1000);
    //
    //   // Vérifie que l'user a bien été modifié
    //   for(let i = 0; i <= await rows.count(); i++) {
    //     const row = await rows.nth(i);
    //     const name = await row.innerText();
    //     if(name.match(nom_user)) {
    //       expect(name.match(nom_user));
    //       expect(name.match(prenom_user));
    //       expect(name.match(email_user));
    //       break;
    //     }
    //   }
    // })
    //
    // test("Devrait supprimer un user", async () => {
    //   let user_to_delete = 'PLOTOB';
    //   let rows = await page.locator('tbody > tr');
    //   for(let i = 0; i <= await rows.count(); i++) {
    //     const row = await rows.nth(i);
    //     const name = await row.innerText();
    //     if(name.match(user_to_delete)) {
    //       const columns = await row.locator('td');
    //       const column = await columns.nth(4);
    //       const boutons = await column.locator('button');
    //       const bouton = await boutons.nth(1);
    //       try {
    //         await bouton.click();
    //       } catch (error) {
    //         console.log("Erreur : ", error);
    //       }
    //       break;
    //     }
    //   }
    //   await page.waitForTimeout(1000);
    //   await page.locator('xpath=/html/body/div[2]/div[2]/div/mat-dialog-container/div/div/app-confirm-delete/div[3]/button[1]').click();
    //   await page.waitForTimeout(1000);
    //   // Vérifie que l'user a bien été supprimé en cherchant dans la liste des utilsiateurs
    //   let user_found = false;
    //   rows = await page.locator('tbody > tr');
    //   for(let i = 0; i < await rows.count(); i++) {
    //     let name = await rows.nth(i).locator('td').nth(0).innerText();
    //     if(name.match(user_to_delete)) {
    //       user_found = true;
    //       break;
    //     }
    //   }
    //   expect(user_found).toBe(false);
    // });

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
