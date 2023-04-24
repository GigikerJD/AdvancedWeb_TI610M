import express from "express";

let articlesInfo = [{
    name: 'learn-react',
    upvotes: 0,
},{
    name: 'learn*node',
    upvotes: 0,
},{
    name: 'mongodb',
    upvotes: 0,
}]

/* demo */
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/hello', (req, res) => {
    res.send("Hello from express.js");
})

app.get('home', (req, res) => {
    res.send("Hi, I'm in the home component !");
})



/*
app.put('/api/articles/:name/upvote', (req,res) => {
    const {name} = req.params;
    const article = articlesInfo.find(a => a.name === name);
    if(article){
        article.upvotes += 1;
        res.send('The ' + name + ' article now has ' + article.upvotes + ' upvotes');
    }else{
        res.send("That article doesn't exist");
    }
})
*/

app.listen(port, () => {
    console.log("Server running on port " + port);
});

