
const csv = require('csv-parser')
const fs = require('fs')
const crypto = require('crypto')

const results = []

fs.createReadStream('book3.csv')
  .pipe(csv())
  .on('data', (data) => { 
    data.hash = crypto.createHash('sha256').update(data.toString()).digest('base64')
    let _newData = { "format": "CHIP-0007", ...data }
    results.push(_newData)
  })
  .on('end', () => {
   
    const resData = [Object.keys(results[0]), ...results.map(it => Object.values(it))].join('\n')
    fs.writeFile('outputs.csv', resData, (err) => { 
      // In case of a error throw err. 
      if (err) {
        console.log("counld not write to file", err)
      } else {
        console.log("Successfully Written to File.")
      }
    })
   
  });



