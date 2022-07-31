function getTextWidthFromId(id) {
  function getTextWidth(text, font) {
    // re-use canvas object for better performance
    const canvas =
      getTextWidth.canvas ||
      (getTextWidth.canvas = document.createElement("canvas"));
    const context = canvas.getContext("2d");
    context.font = font;
    const metrics = context.measureText(text);
    return metrics.width;
  }

  function getCanvasFont(el) {
    function getCssStyle(element, prop) {
      return window.getComputedStyle(element, null).getPropertyValue(prop);
    }

    const fontWeight = getCssStyle(el, "font-weight") || "normal";
    const fontSize = getCssStyle(el, "font-size") || "16px";
    const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

    return `${fontWeight} ${fontSize} ${fontFamily}`;
  }

  const textInput = document.getElementById(id);
  const fontSize = getTextWidth(textInput.value, getCanvasFont(textInput));
  return fontSize;
}

module.exports = { getTextWidthFromId };
