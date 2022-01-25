const Meet = require('../models/meet');

const meet_home = (req,res) => {
    Meet.find().sort([['start']])
    .then(result => {
        // res.send(result);
        res.render('home',{meets:result})
    })
    .catch(err => console.log(err))
}

const meet_create_get = (req,res) => {
    res.render('create');
}

const meet_create_post = (req,res) => {
    const meet = new Meet(req.body);
    // console.log(meet);
    meet.save()
    .then(result => {
        console.log(req.body);
        res.redirect('/');
    })
    .catch(err => console.log(err))
}

const meet_update_get = (req, res) => {
    const id = req.params.id;
    Meet.findById(id)
    .then(result => {
        res.render('update',{meet: result})
    })
    .catch(err => console.log(err))
}

const meet_update_post = (req,res) => {
    const id = req.params.id;
    const meet = new Meet(req.body);
    const title = meet.title;
    const desc = meet.description;
    const start = meet.start;
    const end = meet.end;
    console.log(meet);
    // res.send(meet)
    Meet.findByIdAndUpdate(id,{
        title: title,
        description: desc,
        start: start,
        end: end
    },{useFindAndModify: false})
    .then(result => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
}

const meet_delete = (req,res) => {
    const id =  req.params.id;
    Meet.findByIdAndDelete(id)
    .then(result => {
        res.redirect('/')
    })
    .catch(err => console.log(err))
}

module.exports = {
    meet_create_get,
    meet_create_post,
    meet_delete,
    meet_home,
    meet_update_get,
    meet_update_post
}