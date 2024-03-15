export default function getScreenSize() {
  let width = 0;
  let height = 0;
  
  function getScreen() {
    if (typeof window !== 'undefined') {
      width = window.innerWidth;
      height = window.innerHeight;
    }
  
  }
  getScreen();

  if(typeof window !== 'undefined'){
    window.addEventListener("resize", getScreen);
  }

  return { width, height };
}
