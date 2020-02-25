// Notes Rows

/**
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
async function getFinancialData(companyName,callback){
    let result = ""
    await getFinancePage().then((webData) => {
        let getTag = (webData.search("root.App.main =")) + 16
        webData = webData.substr(getTag)
        let end = (webData.search("</script>"))-12
        let tt = (webData.substr(0,end))
        let json_d = JSON.parse(tt)
        // Expressed as an Array of 25
        let JSON_Stocks = (json_d.context.dispatcher.stores.ScreenerResultsStore.results.rows)
        for(let i = 0; i<JSON_Stocks.length;i++){
            if(JSON_Stocks[i].longName.includes(companyName)){
                callback(JSON_Stocks[i])
            }
        }
    })
}

getFinancialData("Virgin Galactic Holdings, Inc.", (r) => {
    console.log(r)
})
