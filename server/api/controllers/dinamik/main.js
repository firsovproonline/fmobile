let sql = `SELECT count(*) as count FROM impressions`
res.db.sqlite.query(sql).then(item=>{
    let first = (req.query.page*1) -1
    if(first!== 0){
        first = first * req.query.perPage
    }
    sql = `SELECT * FROM impressions order by calldate DESC limit `+first+`,`+req.query.perPage
    console.error(sql)
    res.db.sqlite.query(sql).then(items=>{
        items[0].forEach(item=>{
            item.calldate = new Date(item.calldate*1000).toLocaleString()
        })
        console.error('Запрос закрыт')
        res.json({rows:items[0],total:item[0][0].count})
    })

})
