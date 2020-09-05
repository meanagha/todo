const mongo = require('mongoose');
mongo.connect('mongodb://localhost:27017/todolist', {
    useCreateIndex: true,
    useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true
}, (err) => {
    if (err) {
        console.log('Connectivity error is' + err);
    }
    else {
        console.log('mongodb connection succeed yess');
    }
});
