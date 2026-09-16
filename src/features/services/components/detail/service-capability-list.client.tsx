'use client';

import { useState, useSyncExternalStore } from 'react';
import type { FocusEvent, MouseEvent } from 'react';
import type { ServiceSection } from '../../types/service.types';
import styles from '../../service-detail.module.css';

const mobileQuery = '(max-width: 900px), (hover: none)';

function subscribeToMobile(callback: () => void) {
  const query = window.matchMedia(mobileQuery);
  query.addEventListener('change', callback);
  return () => query.removeEventListener('change', callback);
}

function getMobileSnapshot() {
  return window.matchMedia(mobileQuery).matches;
}

function getServerSnapshot() {
  return false;
}

function ServiceCapabilityRow({
  section,
  index,
  mobile,
  mobileExpanded,
  onMobileToggle,
}: {
  section: ServiceSection;
  index: number;
  mobile: boolean;
  mobileExpanded: boolean;
  onMobileToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const open = mobile ? mobileExpanded : hovered || focused || expanded;

  function handleSummaryClick(event: MouseEvent<HTMLElement>) {
    event.preventDefault();
    if (mobile) onMobileToggle();
    else setExpanded((current) => !current);
  }

  function handleBlur(event: FocusEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setFocused(false);
    }
  }

  return (
    <details
      open={open}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={handleBlur}
    >
      <summary onClick={handleSummaryClick}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        <h2 className={styles.sectionTitle}>{section.title}</h2>
        <i aria-hidden="true">+</i>
      </summary>
      <div className={styles.sectionBody}>
        {section.body?.split('\n\n').map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {section.items && section.items.length > 0 ? (
          <ul>
            {section.items.map((item) => (
              <li key={item.title}>
                <em>{item.title}</em>
                {item.description ? <> — {item.description}</> : null}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </details>
  );
}

export function ServiceCapabilityList({ sections }: { sections: ServiceSection[] }) {
  const mobile = useSyncExternalStore(subscribeToMobile, getMobileSnapshot, getServerSnapshot);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <>
      {sections.map((section, index) => (
        <ServiceCapabilityRow key={section.title} section={section} index={index}
          mobile={mobile} mobileExpanded={activeIndex === index}
          onMobileToggle={() => setActiveIndex(current => current === index ? null : index)} />
      ))}
    </>
  );
}
