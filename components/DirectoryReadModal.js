import {useEffect, useId, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './DirectoryReadModal.module.css';

// Article text is bundled editorial content, not fetched after the visitor clicks.
// Keeping the dialog subtree mounted also makes the original text part of server HTML.
export default function DirectoryReadModal({
  locale='ar', title, html, href, image, triggerLabel, ctaLabel, className=''
}) {
  const en=locale==='en';
  const [open,setOpen]=useState(false);
  const trigger=useRef(null);
  const dialog=useRef(null);
  const close=useRef(null);
  const titleId=useId();
  useEffect(()=>{
    if (!open) return undefined;
    const previous=document.body.style.overflow;
    document.body.style.overflow='hidden';
    close.current?.focus({preventScroll:true});
    const onKeyDown=(event)=>{
      if(event.key==='Escape'){event.preventDefault();setOpen(false);return;}
      if(event.key!=='Tab'||!dialog.current)return;
      const nodes=Array.from(dialog.current.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'))
        .filter(node=>node.getClientRects().length>0);
      if(!nodes.length){event.preventDefault();dialog.current.focus();return;}
      const first=nodes[0],last=nodes[nodes.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',onKeyDown);
    return ()=>{
      document.removeEventListener('keydown',onKeyDown);
      document.body.style.overflow=previous;
      trigger.current?.focus({preventScroll:true});
    };
  },[open]);
  return <>
    <button type="button" ref={trigger} className={`${styles.trigger} ${className}`.trim()}
      aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}>
      {triggerLabel||(en?'Read more':'المزيد')}
    </button>
    <div className={styles.backdrop} hidden={!open}
      onMouseDown={event=>{if(event.target===event.currentTarget)setOpen(false);}}>
      <section ref={dialog} className={styles.dialog} role="dialog" aria-modal="true"
        aria-labelledby={titleId} tabIndex={-1} dir={en?'ltr':'rtl'} lang={en?'en':'ar'}>
        <header className={styles.header}>
          <h2 id={titleId}>{title}</h2>
          <button ref={close} className={styles.close} type="button" onClick={()=>setOpen(false)}
            aria-label={en?'Close reading panel':'إغلاق نافذة القراءة'}>×</button>
        </header>
        <div className={styles.scroll}>
          {image&&<Image src={image} width={1000} height={470} alt={title}
            sizes="(max-width:700px) 100vw, 800px" className={styles.cover} />}
          <div className={styles.article} dangerouslySetInnerHTML={{__html:html}} />
        </div>
        {href&&<footer className={styles.footer}>
          <Link href={href}>{ctaLabel||(en?'Explore this directory':'استكشف الدليل')}</Link>
        </footer>}
      </section>
    </div>
  </>;
}
