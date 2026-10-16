import {test, expect,request} from '@playwright/test';

const baseUrl = "https://api.restful-api.dev/"
let objectID = null
let fullPathwithId='p'

const objectPath = "objects"
const fullURLwithObjectPath = baseUrl + objectPath

//url
//pass parameter
//after ? called: query parameter
test("Get Api", async({request})=>{
    const startTime= Date.now()
    console.log(startTime)
    const response = await request.get(fullURLwithObjectPath)
    let responseBody= await response.json()
    console.log(responseBody)

    let headerResponse= await response.headers()

    //Assert on the status
    expect(response.status()).toBe(200)
    //Assert on the id 
    expect(responseBody[0].id).toBe('1')
    //Assert on the header details
    console.log(headerResponse)
    expect(headerResponse['content-type']).toContain('application/json')

    //Assert Response Size
    let responseSize= (await response.body()).byteLength
    expect(responseSize).toBeLessThan(4000)
    console.log(responseSize)

    //Assert Response Time
    let responseTime= Date.now() - startTime
    console.log(responseTime)
    expect(responseTime).toBeLessThan(2000)
})


test("post api", async({request})=>{
    const payload = {
    "name": 'Lenove',
    "data": { Generation: '5th', Price: '3000', Capacity: '500 GB' }
    }
    
    const response= await request.post(fullURLwithObjectPath, {
        data: payload
    })

    let responseBody= await response.json()
    console.log(responseBody)
    
    expect(response.status()).toBe(200)
    expect(responseBody.name).toContain(payload.name)

    let objectID = responseBody.id
    fullPathwithId = fullURLwithObjectPath + '/'+objectID
})

//Modify Content
test("put api", async({request})=>{
    const payload = {
    "name": 'Lenovo Thinkpad',
    "data": { Generation: '5th', Price: '4000', Capacity: '500 GB' }
    }
    
    const response= await request.put(fullPathwithId, {
        data: payload
    })

    let responseBody= await response.json()
    console.log(responseBody)
    
    expect(response.status()).toBe(200)
    expect(responseBody.name).toContain(payload.name)

    let objectID= responseBody.id
})

//partial update here and not the whole Content will be passed as the put method
test("patch api", async({request})=>{
    const payload = {
    "name": 'ASUS pc',
    }
    
    const response= await request.patch(fullPathwithId, {
        data: payload
    })

    let responseBody= await response.json()
    console.log(responseBody)
    
    expect(response.status()).toBe(200)
    expect(responseBody.name).toContain(payload.name)

    let objectID= responseBody.id
})


test("Delete api", async({request})=>{
    const response= await request.delete(fullPathwithId)
    let responseBody= await response.json()
    console.log(responseBody)
    expect(response.status()).toBe(200)
    expect(responseBody.name).toContain("Object with id")
})