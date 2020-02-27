# Yahoo_Finance_Scraper
Yahoo Finance Scraper
`id = The short key for a specific stock `<br /> 
`getFinancePage()` This obtains the JSON data from 100 most-active website. <br />
`getSpecifiedStock(id)` This obtains the JSON data for a specified stock. It actually returns 9 more random stocks with it. <br />
`getSpecificStock(id,callback)` The callback is a function which returns the JSON data for a specified stock. <br />
`getFinancialData(name, pageData, callback)` The name is the stock name. Just make sure its similar to the full name. Page data is the `getFinancePage()` function. Ensure you put that function in there (Store into a variable, to only call once)

Example <br />
<br />
`getSpecificStock("MSFT", (callback) => {
  // Callback contains the JSON data for MSFT
})`
<br />
`
// Use this approach as this way to call we only call the page once for each stock in the top 100. Single API request!
let page = getFinancePage()
getFinancialData("Microsoft", page, (callback) => {
  // Callback contains the JSON data for Microsoft
})`
<br />
