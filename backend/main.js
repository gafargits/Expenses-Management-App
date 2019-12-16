// const moment = require('moment')

//fetch all expenses
const getTableData = (req, res, db) => {
  db.select('*').from('expenses')
    .then(items => {
      if(items.length){
        res.json(items)
      } else {
        res.json({dataExists: 'false'})
      }
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

//post new expenses
const postTableData = (req, res, db) => {
  // const dateAdded = moment()
  const exp = { 
    date: req.body.date, 
    value: req.body.value, 
    reason:req.body.reason
    }
  db('expenses').insert(exp)
    .returning('*')
    .then(item => {
      res.json(item)
    })
    // .catch(err => console.log(err))
    .catch(err => res.status(400).json({dbError: 'db error creating new expenses'}))
}

//update existing expenses
const putTableData = (req, res, db) => {
    db('expenses').where({
    id: req.body.id
  })
  .update({
    value: req.body.value, 
    reason: req.body.reason
  })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    // .catch(err => console.log(err))
    .catch(err => res.status(400).json({dbError: 'db error while updating expenses'}))
}

//delete expenses
const deleteTableData = (req, res, db) => {
  db('expenses').where({id: req.params.id}).del()
    .then(() => {
      res.json({delete: 'true'})
    })
    .catch(err => console.log(err))
    // .catch(err => res.status(400).json({dbError: 'db error'}))
}

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData
}