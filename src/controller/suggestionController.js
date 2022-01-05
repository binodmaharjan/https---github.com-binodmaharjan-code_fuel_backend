
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

let dbData=[];

const parseValues =async(cb)=>{
    let data =[]
    fs.createReadStream(path.resolve('src/assets', 'SearchTermsDB.csv'))
    .pipe(csv.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on("data", (row) => data.push({keyword:row[0], num : row[1]}))
    .on("end", (rowCount) => {
       cb(data)
    });
}

const searchQuery = async(req, res)=>{

    const { q } = req.query;

    if(q.trim().length===0) 
        return res.status(200).json({data:[]})
    
    if(dbData.length > 0)
    {
        console.log("No parsing is called")
        const filterItems = dbData.filter((item) => item.keyword.startsWith(q))
        if(filterItems.length>10)
        {
            return res.status(200).json({data:filterItems.slice(0,10)})
        }
        else{
            return res.status(200).json({data:filterItems})
        }

    }
    else{

        console.log("parsing is called")
        parseValues(function(result){
            dbData = result;
            dbData.sort(function(a, b) {
                return parseInt(b.num) - parseInt(a.num);
            });
    
            const filterItems = dbData.filter((item) => item.keyword.startsWith(q))
            if(filterItems.length>10)
            {
                return res.status(200).json({data:filterItems.slice(0,10)})
            }
            else{
                return res.status(200).json({data:filterItems})
            }
        })
    }
}

  module.exports = {
    searchQuery,
  };