
const app = require('./app')

const PORT = 4000;

app.listen(4000, ()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})