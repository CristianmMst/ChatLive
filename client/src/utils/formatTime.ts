export const formatTime = (time: Date) => {
  const date = new Date(time);
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "p.m" : "a.m";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strMinutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + strMinutes + " " + ampm;
};
