const modifyFram = async(frame , f)=>{
    frame.resize(1080,1920);
    frame.composite(f,0 , 0);
    return frame;
}

module.exports = modifyFram