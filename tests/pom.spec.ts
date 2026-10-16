import { expect, test } from "../fixtures/fixtures";
import LoginPage from "./pages/loginPage/loginPage";
import ProductPage from "./pages/productPage/productPage";

import * as testData from "./testData/testData.json"

let page
let loginPage
let productPage 

//Grouping
test.describe('suite1', ()=>{
    // run it before every test 
    test.beforeEach(async({browser}) =>{
        page = await browser.newPage()
        loginPage = new LoginPage(page)
        productPage = new ProductPage(page)
        await page.goto('https://www.saucedemo.com/')
    })

    // run it after every test 
    test.afterEach(async({}) =>{
        await page.close()
    })

    test('E2E', async({})=>{
        await loginPage.enterUsername(testData.username)
        await loginPage.enterPassword(testData.password)
        await loginPage.takeScreenShot('./tests/screenshots/loginPage.png')
        await loginPage.clickOnLoginBtn()
        await productPage.clickOnAddToCartBtn()
        await productPage.takeScreenShot('./tests/screenshots/productPage.png')
        await productPage.clickOnCartBtn()
        await productPage.takeScreenShot('./tests/screenshots/cartPage.png')
        await page.waitForTimeout(3000)
    })

})

test('outside suite @sanity', async()=>{
    console.log("outside the suite sanity")
})

test('outside suite @smoke', async()=>{
    console.log("outside the suite smoke")
})

test('outside suite2 @smoke', async()=>{
    console.log("outside the suite smoke again")
})