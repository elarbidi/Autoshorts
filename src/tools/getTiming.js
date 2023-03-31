function timing (){
    const now = new Date();
    return (now.getHours() + ":" + now.getMinutes() +":"+ now.getSeconds())
}

module.exports = timing;