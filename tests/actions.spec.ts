import {test, expect} from '@playwright/test';

test.only("textbox", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/login")
    await page.locator('[id="username"]').fill('tomsmith')
    await page.locator('[id="password"]').pressSequentially('SuperSecretPassword!',{delay: 200})
    await page.locator('[id="password"]').press('Enter')

    await page.close()
    
});

test.only("Click", async({page}) =>{
    await page.goto("https://play1.automationcamp.ir/mouse_events.html")    
    await page.locator('[id="click_area"]').click()
    await expect(page.locator('[id="click_type"]')).toHaveText('Click')
    
    await page.locator('[id="click_area"]').dblclick()
    await expect(page.locator('[id="click_type"]')).toHaveText('Double-Click')
    
    await page.locator('[id="click_area"]').click({button: 'right'})
    await expect(page.locator('[id="click_type"]')).toHaveText('Right-Click')
    await page.close()
})


test.only("radio", async({page}) =>{
    await page.goto("http://test.rubywatir.com/radios.php")
    await page.locator('[class="radioclass"]').check() 
    await expect(page.locator('[id="radioId"]')).not.toBeChecked()
    await page.locator('[id="radioId"]').check() 
    await expect(page.locator('[id="radioId"]')).toBeChecked()

    await page.close()
})


test.only("checkbox", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/checkboxes")
    await page.locator('(//*[@type="checkbox"])[1]').uncheck()
    await expect(page.locator('(//*[@type="checkbox"])[1]')).not.toBeChecked()
    await page.locator('(//*[@type="checkbox"])[1]').check()
    await expect(page.locator('(//*[@type="checkbox"])[1]').isChecked).toBeTruthy()

    await page.close()
})


test.only("dropdown", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/dropdown")
    await page.selectOption('[id="dropdown"]',{
        value: '2'
    })
    await page.pause()

    await page.selectOption('[id="dropdown"]',{
        label: 'Option 1'
    })
    await page.pause()

    await page.selectOption('[id="dropdown"]',{
        index: 1
    })
    await page.pause()

    //    await page.close()
})


test.only("multiselect", async({page}) =>{
    await page.goto("https://www.testmuai.com/selenium-playground/select-dropdown-demo/")
    await page.selectOption('[id="multi-select"]', [
        {value: 'California'},
        {value: 'Florida'},
        {value: 'New Jersey'}
    ])
    
    await page.pause()
        
})


test.only("dynamic", async({page}) =>{
    await page.goto("https://demo.automationtesting.in/Register.html")
    await page.locator('[role="combobox"]').click()
    await page.locator('//li[text()="India"]').click()
    await page.pause()
})


test.only("alerts", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    //this is a listner for the alert, it will listen to the alert and accept it
    page.on("dialog", async(alert) =>{
        const alertMessage = alert.message()
        expect(alertMessage).toEqual("I am a JS Alert")
        await alert.accept()
        await expect(page.locator('[id="result"]')).toHaveText('You successfully clicked an alert')
    })
    await page.locator('[onclick="jsAlert()"]').click()
})

test.only("confirmation ok", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    page.on("dialog", async(alert) =>{
        const alertMessage= alert.message()
        expect(alertMessage).toEqual("I am a JS Confirm")
        await alert.accept()
        await expect(page.locator('[id="result"]')).toHaveText('You clicked: Ok')
    })
    await page.locator('[onclick="jsConfirm()"]').click()
})


test.only("cancel", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    //this is a listner for the alert, it will listen to the alert and cancel it 
    await page.on("dialog", async(alert) =>{
        const alertMessage =alert.message()
        expect(alertMessage).toEqual("I am a JS Confirm")
        await alert.dismiss()
        await expect(page.locator('[id="result"]')).toHaveText("You clicked: Cancel")
    })
    await page.locator('[onclick="jsConfirm()"]').click()
})

test.only("Confirm_prompt", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    page.on("dialog", async(alert) =>{
        const alertMessage= alert.message()
        expect(alertMessage).toEqual("I am a JS prompt")
        await alert.accept("Fatma")
        await expect(page.locator('[id="result"]')).toHaveText('You entered: Fatma')
    })
    await page.locator('[onclick="jsPrompt()"]').click()
})


test.only("Cancel_prompt", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts")
    //this is a listner for the alert, it will listen to the alert and cancel it 
    await page.on("dialog", async(alert) =>{
        const alertMessage =alert.message()
        expect(alertMessage).toEqual("I am a JS prompt")
        await alert.dismiss()
        await expect(page.locator('[id="result"]')).toHaveText("You entered: null")
    })
    await page.locator('[onclick="jsPrompt()"]').click()
})

test("frames", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/nested_frames")
    //Frames Count
    let frameCount =page.frames().length
    console.log("Frames Count is: "+frameCount)

    //enter inside the frame and get the text with the 'frameLocator' method
    let frameBottom = page.frameLocator('[src="/frame_bottom"]').locator('//body[contains(text(),"BOTTOM")]')
    await expect(frameBottom).toHaveText('BOTTOM')

    //nested frame
    let topFrame= page.frame('frame-top')
    let topFrameChilds=topFrame?.childFrames()
    let middleFrame=topFrameChilds[1]
    await expect(middleFrame.locator('[id="content"]')).toHaveText('MIDDLE')
})


test("windows", async({page})=>{
    await page.goto("https://demo.automationtesting.in/Windows.html")
    // prepare a separate tab to open and wait for it to load
    await page.locator('a[href="#Seperate"]').click()

    const [newTab]= await Promise.all([
        page.context().waitForEvent('page'), await page.locator('[onclick="newwindow()"]').click()
    ])

    await newTab.waitForLoadState()
    await newTab.locator('[href="/downloads"]').click()
    await expect(newTab.locator('[class="d-1"]')).toContainText('Downloads')

    await page.locator('[href="Index.html"]').click()
    await expect(page.locator('[id="btn1"]')).toHaveText('Sign In')

    await page.close()
    await newTab.close()
})


test("drag_drop", async({page}) =>{
    await page.goto("https://the-internet.herokuapp.com/drag_and_drop")
    const boxA = page.locator('[id="column-a"]')
    const boxB = page.locator('[id="column-b"]')

    //1er methode
    await boxA.hover()
    await page.mouse.down()
    await boxB.hover()
    await page.mouse.up()

    await page.waitForTimeout(2000)

    //2eme Methode
    await boxB.dragTo(boxA)
    await page.waitForTimeout(2000)

    await page.close()
})

test("download", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/download")

    const download= await Promise.all(
        [
            page.waitForEvent('download'),
            await page.locator('[href="download/ExampleFile.txt"]').click()
        ]
    )

    const downloadFile= download[0]
    const downloadPath= await downloadFile.path()
    const downloadedFileName= downloadFile.suggestedFilename()
    //rename file
    //await downloadFile.saveAs(downloadedFileName)
    await downloadFile.saveAs("test.txt")
    console.log(`the downloaded file Path is: ${downloadPath}`)

    await page.close()
})


test("upload", async({page})=>{
    await page.goto("https://the-internet.herokuapp.com/upload")
    
    const fileUpload= await Promise.all(
        [
            page.waitForEvent('filechooser'),
            await page.locator('[id="file-upload"]').click()
        ]
    )
    await fileUpload[0].setFiles('./ExampleFile.txt')
    await page.locator('[id="file-submit"]').click()
    await page.waitForTimeout(2000)

    //await page.pause()
    await page.close()
})