import { useEffect, useId, useRef, useState } from 'react';
import styles from './DirectoryReadingDialog.module.css';

// The reading content is rendered in the original HTML even while the dialog is closed.
export default function DirectoryReadingDialog({ title, locale = 'ar', children }) {
  const dialog = useRef(null);
  const trigger = useRef(null);
  const headingId = useId();
  const [open, setOpen] = useState(false);
  const en = locale === 'en';

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  const show = () => {
    if (!dialog.current?.open) {
      dialog.current?.showModal();
      setOpen(true);
    }
  };
  const closed = () => {
    setOpen(false);
    trigger.current?.focus({ preventScroll: true });
  };

  return <>
    <button ref={trigger} type="button" className={styles.trigger} onClick={show} aria-haspopup="dialog">{en ? 'Read more' : 'المزيد'}</button>
    <dialog ref={dialog} className={styles.dialog} aria-labelledby={headingId} onClose={closed} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className={styles.panel} dir={en ? 'ltr' : 'rtl'} lang={locale}>
        <div className={styles.header}>
          <h2 id={headingId}>{title}</h2>
          <button type="button" onClick={() => dialog.current?.close()} aria-label={en ? 'Close reading window' : 'إغلاق نافذة القراءة'} className={styles.close}>×</button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
    </dialog>
  </>;
}
