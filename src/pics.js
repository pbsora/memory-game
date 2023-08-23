export default function Pics() {
  let pic = [];
  const getData = async () => {
    for (let i = 0; i <= 5; i++) {
      const res = await fetch("https://api.waifu.pics/sfw/waifu");
      const data = await res.json();
      /* setGif((prev) => [...prev, data.url]); */
      pic.push(data);
    }
  };
  getData();
  return pic;
}
