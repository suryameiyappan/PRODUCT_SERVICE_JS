const 
    axios = require('axios'),
    cron = require('node-cron');
/*
|--------------------------------------------------------------------------
| Define a task to run every hour
|--------------------------------------------------------------------------
*/
cron.schedule('0 * * * *', () => {
  axios({
    method: 'POST',
    url: process.env.CKYC_DETAILS,
    headers: {
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
        "module": "ckyc",
        "provider": "CORE",
        "data": {
            "ckyc_document_type": "",
            "ckyc_document_id": "",
            "ckyc_document_number": "",
            "ckyc_dob": "",
            "quote_id": ""
        }
    })
  }).then(response => {
    const resData = response.data;
    const timeString = new Date().toLocaleTimeString();
    if (resData.statusCode == 200) {
        console.log("<--if-->", resData.message, "<--time-->", timeString);
    } else {
        console.log("<--else-->", resData.message, "<--time-->", timeString);
    }
  });
});

module.exports = cron;
