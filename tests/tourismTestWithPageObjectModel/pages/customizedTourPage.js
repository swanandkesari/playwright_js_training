export class CustomizedTourPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;

    // -----------------------------------------------------------------------
    // LOCATORS — defined once in the constructor, reused everywhere
    // -----------------------------------------------------------------------

    /** @readonly */ this.customizedToursPageform = this.page.locator('form[name="internationalf"]')

    /** @readonly */this.fullNameInput = this.customizedToursPageform.getByPlaceholder('Full name');
    /** @readonly */this.emailInput = this.customizedToursPageform.getByPlaceholder('Email address');
    /** @readonly */this.addressInput = this.customizedToursPageform.locator('#comment.form-control');
    /** @readonly */this.numberOfMembersInput = this.customizedToursPageform.getByPlaceholder('Enter number of members:');
    /** @readonly */this.numberOfDaysInput = this.customizedToursPageform.getByPlaceholder('Enter number:');
    /** @readonly */this.snackProvidedRadioYes = this.customizedToursPageform.getByRole('radio', { name: 'Yes' });
    /** @readonly */this.snackProvidedRadioNo = this.customizedToursPageform.getByRole('radio', { name: 'No' });
    /** @readonly */this.snackProvidedRadioMaybe = this.customizedToursPageform.getByRole('radio', { name: 'Maybe' });
    /** @readonly */this.preferredStayDropdown = this.customizedToursPageform.locator('//select[@id="days"]');
    /** @readonly */this.usaCheckbox = this.customizedToursPageform.getByRole('checkbox', { name: 'USA' });
    /** @readonly */this.englandCheckbox = this.customizedToursPageform.getByRole('checkbox', { name: 'England' });
    /** @readonly */this.franceCheckbox = this.customizedToursPageform.getByRole('checkbox', { name: 'France' });
    /** @readonly */this.submitButton = this.customizedToursPageform.getByRole('button', { name: /Submit/ });
    /** @readonly */this.successMessage = this.page.locator('#successMessage');
    }


    async fillForm({ fullName, email, address, numberOfMembers, numberOfDays, snackProvided, preferredStay, countries }) {
        await this.fullNameInput.fill(fullName);
        await this.emailInput.fill(email);
        await this.addressInput.fill(address);
        await this.numberOfMembersInput.fill(numberOfMembers.toString());
        await this.numberOfDaysInput.fill(numberOfDays.toString());

        if (snackProvided === 'Yes') {
            await this.snackProvidedRadioYes.check();
        } else if (snackProvided === 'No') {
            await this.snackProvidedRadioNo.check();
        } else if (snackProvided === 'Maybe') {
            await this.snackProvidedRadioMaybe.check();
        }

        await this.preferredStayDropdown.selectOption(preferredStay);

        if (countries.includes('USA')) {
            await this.usaCheckbox.check();
        }
        if (countries.includes('England')) {
            await this.englandCheckbox.check();
        }
        if (countries.includes('France')) {
            await this.franceCheckbox.check();
        }

        await this.submitButton.click();
    }

}