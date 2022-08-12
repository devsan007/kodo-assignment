const dataList = require("../util/mock-data.json");

exports.getList = (req, res, next) => {
    res.render('list/getList',{
        dataList : dataList,
        pageTitle : 'Data list',
        pagePath : '/list/getList',
        searchedText : ''
    });
};

exports.searchList = (req, res, next) => {
    console.log("req body : ",req.body);
    let reqParam = req.body;
    let searchedText = '';
    let searchVal = '';
    let filteredList= [];
    if(reqParam && reqParam.searchVal && req.body.searchVal != ''){
        searchVal = req.body.searchVal;
        searchedText = req.body.searchVal;
        if(searchVal.includes('"') && searchVal.indexOf('"') === 0){
            let tempSearchStr = searchVal.split('"');
            searchVal = tempSearchStr[1];
            console.log("searchVal",searchVal);
            filteredList = dataList.filter((data)=>{
                return data.name.toLowerCase().includes(searchVal.toLowerCase()) || data.description.toLowerCase().includes(searchVal.toLowerCase());
            });
        }else{
            searchVal = searchVal.toLowerCase().split(" ").join(".*");
            console.log("searchVal",searchVal);
            let regexExp = new RegExp(searchVal);
            console.log("regexExp : ",regexExp);
            dataList.forEach(element => {
                let name = element.name;
                let description = element.description;
                let regexLen = name.toLowerCase().match(regexExp) || description.toLowerCase().match(regexExp);
                if(regexLen && regexLen.length > 0){
                    filteredList.push(element);
                }
            });
        }
        res.render('list/getList',{
            dataList : filteredList,
            pageTitle : 'Data list',
            pagePath : '/list/getList',
            searchedText : (filteredList.length > 0) ? searchedText : ''
        });
    }else{
        res.render('list/getList',{
            dataList : dataList,
            pageTitle : 'Data list',
            pagePath : '/list/getList',
            searchedText : ''
        });
    }
    
};