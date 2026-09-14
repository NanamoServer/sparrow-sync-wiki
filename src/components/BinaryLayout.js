import React, {useId, useState} from 'react';
import styles from './BinaryLayout.module.css';

export default function BinaryLayout({title, caption, headerBytes, fields, total, labels}) {
  const [active, setActive] = useState(0);
  const id = useId();
  const field = fields[active];

  return (
    <figure className={styles.layout} aria-label={title}>
      <figcaption className={styles.heading}>
        <div><span className={styles.eyebrow}>{caption}</span><strong>{title}</strong></div>
        <span className={styles.badge}>{headerBytes} B <span>{labels.header}</span></span>
      </figcaption>
      <div className={styles.diagram}>
        <div className={styles.direction}><span>{labels.order}</span><span aria-hidden="true">→</span></div>
        <div className={styles.fields}>
          {fields.map((item, index) => (
            <button
              type="button"
              key={item.name}
              className={`${styles.field} ${styles[item.tone]} ${index === active ? styles.active : ''}`}
              aria-pressed={index === active}
              aria-controls={`${id}-detail`}
              aria-label={`${item.name}, ${labels.offset} ${item.offset}, ${item.size}`}
              onClick={() => setActive(index)}
            >
              <span className={styles.offset}>+{item.offset}</span>
              <strong>{(item.label || item.name).split(/(?=[A-Z])/).map((part, partIndex) => <React.Fragment key={partIndex}>{partIndex > 0 && <wbr />}{part}</React.Fragment>)}</strong>
              <span className={styles.size}>{item.size}</span>
            </button>
          ))}
        </div>
        <div className={styles.legend}><span>{labels.hint}</span><span>{labels.scale}</span></div>
      </div>
      <div id={`${id}-detail`} className={`${styles.detail} ${styles[field.tone]}`} aria-live="polite" aria-atomic="true">
        <div key={field.name} className={styles.detailContent}>
          <div className={styles.detailTitle}><code>{field.name}</code><span>{field.type}</span></div>
          <p>{field.description}</p>
          <div className={styles.measurements}>
            <span>{labels.offset} <b>{field.offset}</b></span>
            <span>{labels.length} <b>{field.size}</b></span>
            {field.coverage && <span>{labels.coverage} <b>{field.coverage}</b></span>}
          </div>
        </div>
      </div>
      <div className={styles.total}><span>{labels.total}</span><code>{total}</code></div>
    </figure>
  );
}
