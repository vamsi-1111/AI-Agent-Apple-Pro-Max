const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());
const locateChrome = require('chrome-location');
const { executablePath } = require('puppeteer');

const url_16 = "https://www.apple.com/shop/buy-iphone/iphone-16?afid=p238%7Cspt9IANwA-dc_mtid_20925d2q39172_pcrid_719078865286_pgrid_167776336472_pntwk_g_pchan__pexid__ptid_kwd-2187367930314_&cid=wwa-us-kwgo-iphone--slid---NonCore-iPhone16-us_iphone_airefresh_102824-";

async function givePage() 
{
    const browser = await puppeteer.launch({ headless: false, executablePath: locateChrome });
    let page = await browser.newPage();
    return page;

}

async function run() 
{
    let page = await givePage();
    await page.goto(url_16);
    await add_to_cart(page);
    await shipping(page);
    await payment(page);

}

async function add_to_cart(page) 
{
    let selector = "input[data-autom='dimensionScreensize6_1inch']";
    await page.waitForSelector(selector);
    await page.evaluate(() => { document.querySelector("input[data-autom='dimensionScreensize6_1inch']").click(); });

    selector = "input[value='black']";
    await page.waitForSelector(selector);
    await page.evaluate((s) => document.querySelector(s).click(), selector);

    selector = "input[data-autom='dimensionCapacity256gb']";
    await page.waitForSelector(selector);
    await page.evaluate((s) => document.querySelector(s).click(), selector);

    selector = '[id="noTradeIn_label"]';
    await page.evaluate((s) => document.querySelector(s).click(), selector);
    await new Promise((r) => setTimeout(r, 1500));

    selector = '[data-autom="purchaseGroupOptionfullprice_price"]';
    await page.evaluate((s) => document.querySelector(s).click(), selector);
    await new Promise((r) => setTimeout(r, 1500));

    selector = '[data-autom="carrierModelUNLOCKED/US"]';
    await page.evaluate((s) => document.querySelector(s).click(), selector);
    await new Promise((r) => setTimeout(r, 1500));

    selector = '[id="applecareplus_58_noapplecare"]';
    await page.waitForSelector(selector); 
    await page.evaluate((s) => document.querySelector(s).click(), selector); 
    await new Promise((r) => setTimeout(r, 1500));

    selector = '[data-autom="add-to-cart"]';
    await page.waitForSelector(selector);
    await page.evaluate((s) => document.querySelector(s).click(), selector);

}

async function shipping(page) 
{

    selector = "button[data-autom='proceed']"
    await page.waitForSelector(selector)
    await page.evaluate((s) => document.querySelector(s).click(), selector);

    selector = "[id='shoppingCart.actions.navCheckoutOtherPayments']";
    await page.waitForSelector(selector)
    await page.evaluate((s) => document.querySelector(s).click(), selector);

    selector = "[data-autom='guest-checkout-btn']";
    await page.waitForSelector(selector)
    await page.evaluate((s) => document.querySelector(s).click(), selector);

    selector = "[id='rs-checkout-continue-button-bottom']";
    await page.waitForSelector(selector)
    await page.evaluate((s) => document.querySelector(s).click(), selector);

    selector = "input[id='checkout.shipping.addressSelector.newAddress.address.firstName'"
    await page.waitForSelector(selector)
    await page.type(selector, "Vamsi")

    await page.type("input[name='lastName']", 'Chitturi');
    await page.type("input[name='street']", '10 Bartlett Street');
    

    const input = await page.$("input[name='postalCode']");
    await input.click({clickCount: 3});
    await input.type('08901');

    
    await page.type("input[name='emailAddress']", 'vch2ri@gmail.com' );
    await new Promise(r => setTimeout(r, 1000));
    await page.type("input[name='fullDaytimePhone']", '8482039967');
    await new Promise(r => setTimeout(r, 1000));
    await page.click('#rs-checkout-continue-button-bottom')

}

async function payment(page)
{

    selector = "[id='checkout.billing.billingoptions.credit_label']";
    await page.waitForSelector(selector)
    await page.evaluate((s) => document.querySelector(s).click(), selector);

    selector = "input[id='checkout.billing.billingOptions.selectedBillingOptions.creditCard.cardInputs.cardInput-0.cardNumber']"
    await page.waitForSelector(selector)
    await page.type(selector, "5507449734754373")

    await page.type("[id='checkout.billing.billingOptions.selectedBillingOptions.creditCard.cardInputs.cardInput-0.expiration']", "11/29")
    await page.type("[id='checkout.billing.billingOptions.selectedBillingOptions.creditCard.cardInputs.cardInput-0.securityCode']", "111")

    await page.click("button[id='rs-checkout-continue-button-bottom']")

    selector = "button[id='rs-checkout-continue-button-bottom']";
    await page.waitForSelector(selector)
    await page.evaluate((s) => document.querySelector(s).click(), selector);
    
}


async function smart_click_with_pause(page, selector, pause) {
    await page.waitForSelector(selector)
    await page.evaluate((s) => document.querySelector(s).click(), selector)
    await new Promise(r => setTimeout(r, pause));
}


run();
