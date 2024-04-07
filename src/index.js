import { createPattern, canvas } from "./canvas";

document.addEventListener("keypress", (event) => handleKeypress(event.code));
console.log("hui");
createPattern();

//*******************************************************************************************

function handleKeypress(key) {
  if (key === "KeyG") {
    createPattern();
  }
  if (key === "KeyS") {
    saveImage();
  }
}

function saveImage() {
  const today = new Date();
  const date =
    today.getFullYear() + "_" + (today.getMonth() + 1) + "_" + today.getDate();
  const time =
    today.getHours() + "_" + today.getMinutes() + "_" + today.getSeconds();
  const dateTime = date + "__" + time;

  const link = document.createElement("a");
  link.href = canvas.toDataURL();
  link.download = dateTime + "_pattern.png";
  link.click();
  ctx.clear();
}
