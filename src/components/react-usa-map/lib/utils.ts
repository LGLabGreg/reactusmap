const nullFunc = () => null;

const isElementOutOfWindow = (element: HTMLElement): boolean => {
  const rect = element.getBoundingClientRect();
  const windowHeight =
    window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const elementTop = rect.top;
  const elementBottom = rect.bottom;
  const elementLeft = rect.left;
  const elementRight = rect.right;

  const isOutOfVerticalWindow = elementBottom < 0 || elementTop > windowHeight;
  const isOutOfHorizontalWindow = elementRight < 0 || elementLeft > windowWidth;

  return isOutOfVerticalWindow || isOutOfHorizontalWindow;
};

export { nullFunc, isElementOutOfWindow };
