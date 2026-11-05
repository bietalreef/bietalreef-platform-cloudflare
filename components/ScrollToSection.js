export default function ScrollToSection({ target, children, ...props }) {
  function scroll() {
    const section = document.getElementById(target);
    if (!section) return;
    if (!section.hasAttribute('tabindex')) section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  return <button type="button" {...props} onClick={scroll}>{children}</button>;
}
