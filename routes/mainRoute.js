var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var mqttPublish = require("../services/mqttPublish")
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('main');
});

router.get('/1', (req, res, next) => {
    res.render('main1');
});
router.get('/2', (req, res, next) => {
    res.render('pump');
});
router.get('/3', (req, res, next) => {
    res.render('test');
});

router.post('/dataInfo', (req, res, next) => {
    try{
        if(req.body.length == undefined) {
             console.log(req.body)
        } else {
            for(var i=0; i<req.body.length; i++) {
                let header = req.body[i].header
                let uid = req.body[i].uid
                let action = req.body[i].sub.action
                let part = req.body[i].sub.part
                let timestart = req.body[i].timealarm.timestart
                let timestop = req.body[i].timealarm.timestop
                
                // console.log(sub.action)
                mqttPublish.start(header, uid, action, part, timestart, timestop)
            }
        }
        
        
    }catch(e){
        next(e)
    }
})


dataList = []
test = null

const routerPublish = () => {
    const header = dataList[0].header
    const uid = dataList[0].uid
    const action = dataList[0].action
    const part = dataList[0].part
        
    mqttPublish.start(header, uid, 5, part)

    setTimeout(() => { mqttPublish.start(header, uid, action, part) }, 1000);
}

router.post('/dataInfo1', (req, res, next) => {
    try{
        console.log("ROUTER OK!")
        let header = req.body.header
        let uid = req.body.uid
        let action = req.body.sub.action
        let part = req.body.sub.part
        let on = req.body.on
        /***********************************************************************데이터 1차 보내기********************************************************************/
        const clientData = {header, uid, action, part}

        /***********************************************************************데이터 2차 보내기********************************************************************/
        if(on == 1){ // all 일 때
            mqttPublish.start(header, uid, action, part) 
            dataList = []
            dataList.push(clientData)
            test = setInterval(routerPublish, 5000)
            
        } else if(on == 0) {
            clearInterval(test)
            dataList = []
            

            let header = req.body.header
            let uid = req.body.uid
            let action = req.body.sub.action
            let part = req.body.sub.part
            let on = req.body.on

            mqttPublish.start(header, uid, action, part)
        }
    } catch(e) {
        next(e)
    }
})

router.post('/dataInfo2', (req, res, next) => {
    try{
        console.log("ROUTER2 OK!!")
        let header = req.body.header
        let uid = req.body.uid
        let action = req.body.sub.action
        let part = req.body.sub.part
        let timestart = ""
        let timestop = ""
        let continue1 = ""

        mqttPublish.start(header, uid, action, part, timestart, timestop ,continue1)
        

    }catch(e){
        next(e)
    }
})


module.exports = router;
