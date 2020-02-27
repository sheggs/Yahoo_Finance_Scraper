// Notes Rows

/**
 *  This only gets the 100 stcoks Yahoo stores. 
 * 
 *  
 * To get the page data call the getFinancePage() function. This returns a promise.
 * To get the JSON for a company use getFinancialData(Company Name, Promise for the Yahoo Page, (callback) => {})
 * 
 * 
 * 0 - Ford Motor Company (F)
 * 1 - AMD (AMD)
 * 2 - Bank of America Corp. (BOA)
 * 3 - General Electric (GE)
 * 4 - Microsoft (MSFT)
 * 5 - NIO Inc (NIO)
 * 6 - Apple Inc (AAPL)
 * 7 - Vale S.A. (VALE)
 */

const http = require('https');


async function getFinancePage(){
    return new Promise( (res,rej) => {
        http.get("https://finance.yahoo.com/most-active?offset=0&count=100", (response) => {
            let data = ""
            response.on('data', (c) => {
                data += c
                
            })
            response.on('end',(c)=>{
                res(data)
            })
        })
    })

}

// https://finance.yahoo.com/quote/?StockID

async function getSpecifiedStock(id){
    return new Promise((res,rej) => {
        http.get("https://finance.yahoo.com/quote/" + id, (r) =>{
            let resp_data = ""
            r.on('data',(context) => {
                resp_data += context
            })
            r.on('end',(c) => {
                res(resp_data)
            })
        })
    })
}
async function getSpecificStock(id, callback) {
    await getSpecifiedStock(id).then((webData) => {
        const getTag = (webData.search("root.App.main =")) + 16
        webData = webData.substr(getTag)
        const end = (webData.search("</script>"))-12
        const tt = (webData.substr(0,end))
        const json_d = JSON.parse(tt)
        const stockD = (json_d.context.dispatcher.stores.StreamDataStore.quoteData)
       // console.log(stockD)
        for(let a in stockD){
            if(a == id){
                callback(stockD[a])
            }
            
        }
    })
}
async function getFinancialData(companyName,pageData,callback){
    let result = ""
    await pageData.then((webData) => {
        const getTag = (webData.search("root.App.main =")) + 16
        webData = webData.substr(getTag)
        const end = (webData.search("</script>"))-12
        const tt = (webData.substr(0,end))
        const json_d = JSON.parse(tt)
        // Expressed as an Array of 25
        const JSON_Stocks = (json_d.context.dispatcher.stores.ScreenerResultsStore.results.rows)
        for(let i = 0; i<JSON_Stocks.length;i++){
            if(JSON_Stocks[i].longName.includes(companyName)){
                callback(JSON_Stocks)
            }
        }
    })
}


/** Test */

// let pageData = getFinancePage();
getSpecificStock("JD",(c) => {
    console.log(c)
})


// getSpecificStock("MSFT", (c) => {
//     console.log("hi")
//     console.log(c)
// })

// getFinancialData("Apple",pageData, (r) => {
//     console.log(r)
// })
