import hljs from 'highlight.js';

window.tooltipContainer?.remove();

declare global {
  interface Window {
    tooltipContainer?: HTMLElement;
  }
}

const tooltipContainer = window.tooltipContainer = document.createElement(`div`);
tooltipContainer.classList.add(`custom-twoslash-tooltip`);
tooltipContainer.style.display = `none`;

const tooltipCode = document.createElement(`div`);
tooltipCode.classList.add(`custom-twoslash-code`);
tooltipContainer.appendChild(tooltipCode);

const tooltipDescription = document.createElement(`div`);
tooltipDescription.classList.add(`custom-twoslash-description`);
tooltipContainer.appendChild(tooltipDescription);

document.body.classList.add(`custom-twoslash`);
document.body.appendChild(tooltipContainer);

document.body.addEventListener(`mouseenter`, e => {
  const target = e.target! as HTMLElement;
  if (target.nodeName !== `DATA-LSP`)
    return;

  const content = target.getAttribute(`lsp`)!;

  let description = ``;
  let code = content;

  const dblLine = content.lastIndexOf(`\n\n`);
  if (dblLine !== -1) {
    description = content.slice(0, dblLine).trim();
    code = content.slice(dblLine + 2).trim();
  }

  const IRRELEVANT_CODE = [
    /^import [A-Za-z]+$/,
  ];

  const isDescriptionVisible = !!description;
  const isCodeVisible = !IRRELEVANT_CODE.some(pattern => code.match(pattern));

  tooltipDescription.style.display = isDescriptionVisible ? `block` : `none`;
  tooltipDescription.innerText = ``;

  for (const paragraphText of description.split(/\n\n/)) {
    const paragraph = document.createElement(`p`);
    paragraph.innerText = paragraphText;
    tooltipDescription.appendChild(paragraph);
  }

  tooltipCode.style.display = isCodeVisible ? `block` : `none`;
  tooltipCode.innerHTML = hljs.highlight(code, {language: `typescript`}).value;

  const position = getPosition(target);

  tooltipContainer.style.left = `${position.left}px`;
  tooltipContainer.style.top = `${position.top + 20}px`;

  tooltipContainer.style.display = isDescriptionVisible || isCodeVisible ? `block` : `none`;

  const onleave = () => {
    tooltipContainer.style.display = `none`;
    target.removeEventListener(`mouseleave`, onleave);
  };

  target.addEventListener(`mouseleave`, onleave);
}, true);

function getPosition(element: HTMLElement) {
  const clientRect = element.getBoundingClientRect();
  return {
    left: clientRect.left + window.pageXOffset,
    top: clientRect.top + window.pageYOffset,
  };
}
