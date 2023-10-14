<h3>Some tips if you are using PassportJS (with Mongodb database):</h3>h3>
<br>
 Model.findById function (provided by mongoose) no longer accepts a callback , instead you can use then-catch or an async function (for promises)
<br>
 req.logout (provided by Passport) is now an asynchronous function, whereas previously it was synchronous. Hence it now requires a callback function to deal with session errors. 
