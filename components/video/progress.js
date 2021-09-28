
const Progress = (props, ref) => {
  const { duration, currentTime } = props

  return (
    <div>
      {format(currentTime)}/{format(duration)}
    </div>
  )
}

export default Progress

function format(time) {
    var hrs = ~~(time / 3600);
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;

    var ret = "";
    if (hrs > 0) {
        ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }
    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}
