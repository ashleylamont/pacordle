export default function startAnimation(
  element: HTMLElement,
  animationName: string,
  duration: number = 1,
) {
  function handleAnimationEnd(e: AnimationEvent) {
    e.stopPropagation();
    element.classList.remove('animate__animated', `animate__${animationName}`);
    element.removeEventListener('animationend', handleAnimationEnd);
  }

  element.classList.add('animate__animated', `animate__${animationName}`);
  element.style.setProperty('--animate-duration', `${duration}s`);
  element.addEventListener('animationend', handleAnimationEnd);
}
