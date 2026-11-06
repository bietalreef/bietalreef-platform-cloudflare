import {useEffect, useId, useRef, useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './DirectoryReadModal.module.css';

// The native dialog's top layer is not clipped by a transformed or overflow-hidden card.
// Full article markup stays server-rendered; no article is fetched after clicking.
export default function DirectoryReadModal({
  locale='ar', title, html, href, image, triggerLabel, ctaLabel, className=''
}) {
  const en=locale==='en';
  const [open,setOpen]=useState(false);
  const trigger=useRef(null);
  const dialog=useRef(null);
  const closeButton=useRef(null);
  const titleId=useId();

  useEffect(()=>{
    if(!open)return undefined;
    const node=dialog.current;
    if(!node)return undefined;
    const previousOverflow=document.body.style.overflow;
    if(!node.open)node.showModal();
    document.body.style.overflow='hidden';
    closeButton.current?.focus({preventScroll:true});
    const onKeyDown=(event)=>{
      if(event.key!=='Tab')return;
      const nodes=Array.from(node.querySelectorAll('a[href],button:not([disabled]),[tabindex]:not([tabindex="-1"])'))
        .filter(element=>element.getClientRects().length>0);
      if(!nodes.length){event.preventDefault();node.focus();return;}
      const first=nodes[0],last=nodes[nodes.length-1];
      if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
      else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
    };
    document.addEventListener('keydown',onKeyDown);
    return ()=>{
      document.removeEventListener('keydown',onKeyDown);
      if(node.open)node.close();
      document.body.style.overflow=previousOverflow;
      trigger.current?.focus({preventScroll:true});
    };
  },[open]);

  return <>
    <button type="button" ref={trigger} className={`${styles.trigger} ${className}`.trim()}
      aria-haspopup="dialog" aria-expanded={open} onClick={()=>setOpen(true)}>
      {triggerLabel||(en?'Read more':'المزيد')}
    </button>
    <dialog ref={dialog} className={styles.dialog} aria-modal="true"
      aria-labelledby={titleId} dir={en?'ltr':'rtl'} lang={en?'en':'ar'}
      onCancel={event=>{event.preventDefault();setOpen(false);}}
      onClose={()=>setOpen(false)}
      onMouseDown={event=>{
        const rect=dialog.current?.getBoundingClientRect();
        if(rect&&(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom))
          setOpen(false);
      }}>
      <header className={styles.header}>
        <h2 id={titleId}>{title}</h2>
        <button ref={closeButton} className={styles.close} type="button" onClick={()=>setOpen(false)}
          aria-label={en?'Close reading panel':'إغلاق نافذة القراءة'}>×</button>
      </header>
      <div className={styles.scroll}>
        {image&&<Image src={image} width={1000} height={470} alt={title}
          sizes="(max-width:700px) 100vw, 800px" className={styles.cover} />}
        <div className={styles.article} dangerouslySetInnerHTML={{__html:html}}
          onClick={event=>{
            const link=event.target.closest?.('a[data-read-target]');
            if(!link||!event.currentTarget.contains(link))return;
            const id=link.getAttribute('data-read-target');
            const heading=Array.from(dialog.current?.querySelectorAll('h3[id]')||[])
              .find(node=>node.id===id);
            if(!heading)return;
            event.preventDefault();
            heading.scrollIntoView({block:'start',behavior:'instant'});
            heading.focus({preventScroll:true});
          }} />
      </div>
      {href&&<footer className={styles.footer}>
        <Link href={href}>{ctaLabel||(en?'Explore this directory':'استكشف الدليل')}</Link>
      </footer>}
    </dialog>
  </>;
}
