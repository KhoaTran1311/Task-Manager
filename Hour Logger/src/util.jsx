const secondsToTime = (duration) => {
    const seconds =  duration % 60;
    let minutes = Math.floor(duration/60) ;

    const hours = Math.floor(minutes / 60);
    // minutes = duration - hours * 60;
    return (((hours<10) ? '0' + hours : hours) + ':' + ((minutes<10) ? '0' + minutes : minutes) + ':' + ((seconds<10) ? '0' + seconds : seconds))
}

export default secondsToTime;