# Yahoo_Finance_Scraper
Yahoo Finance Scraper
'id = The short key for a specific stock' \n
'getFinancePage()' This obtains the JSON data from 100 most-active website. \n
'getSpecifiedStock(id)' This obtains the JSON data for a specified stock. It actually returns 9 more random stocks with it. \n
'getSpecificStock(id,callback)' The callback is a function which returns the JSON data for a specified stock.


Example 
' 
getSpecificStock("MSFT", (callback) => {
  // Callback contains the JSON data for MSFT
})
'
