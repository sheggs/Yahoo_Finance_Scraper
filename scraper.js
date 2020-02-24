// Notes Rows

/**
 * 0 - Ford Motor Company
 * 1 - AMD
 * 2 - Bank of America Corp.
 * 3 - General Electric
 * 4 - Microsoft
 * 5 - NIO Inc
 * 6 - Apple Inc
 * 7 - Vale S.A.
 */

const http = require('https');
console.log("hi")
let cc  = 0;
async function getFinancePage(){
    let data = ''
    return new Promise( (res,rej) => {
        http.get("https://finance.yahoo.com/most-active", (response) => {
            data = ""
            response.on('data', (c) => {
                data += c
                
            })
            response.on('end',(c)=>{
                res(data)
            })
        })
    })

}

getFinancePage().then((d) => {
    let webData = (d);

    let getTag = (webData.search("root.App.main =")) + 16
    webData = webData.substr(getTag)
    let end = (webData.search("</script>"))-12
    let tt = (webData.substr(0,end))
    let json_d = JSON.parse(tt)
    console.log(json_d.context.dispatcher.stores.ScreenerResultsStore.results.rows[0])
})