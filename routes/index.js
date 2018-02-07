module.exports=(app)=>{
    app.use('/api',require('./login'))
    app.use('/api',require('./classify'))
    app.use('/api',require('./article'))
    app.use('/api',require('./info'))
}