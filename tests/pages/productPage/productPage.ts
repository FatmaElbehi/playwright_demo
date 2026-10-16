import BasePage from "../basePage";


export default class ProductPage extends BasePage{
    private readonly addToCartBtn= this.page.locator('[id="add-to-cart-sauce-labs-backpack"]')
    private readonly cartBtn= this.page.locator('[id="shopping_cart_container"]')

    async clickOnAddToCartBtn(){
        await this.clickOnElement(this.addToCartBtn)
    }

    async clickOnCartBtn(){
        await this.clickOnElement(this.cartBtn)
    }


}