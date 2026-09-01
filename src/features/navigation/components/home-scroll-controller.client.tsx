'use client';

import { useEffect } from 'react';

const sectionIds = [
  'top',
  'who-we-are',
  'our-attitude',
  'team',
  'enquiry',
  'dgtl-field',
  'site-footer',
] as const;

function getSections() {
  return sectionIds
    .map((id) => document.getElementById(id))
    .filter((section): section is HTMLElement => section !== null);
}

function getClosestSectionIndex(sections: HTMLElement[]) {
  return sections.reduce((closestIndex, section, index) => {
    const closestDistance = Math.abs(sections[closestIndex].getBoundingClientRect().top);
    const sectionDistance = Math.abs(section.getBoundingClientRect().top);
    return sectionDistance < closestDistance ? index : closestIndex;
  }, 0);
}

function canScrollNestedRegion(target: EventTarget | null, deltaY: number) {
  if (!(target instanceof Element)) return false;

  const region = target.closest<HTMLElement>('[data-native-scroll]');
  if (!region) return false;

  if (deltaY > 0) {
    return region.scrollTop + region.clientHeight < region.scrollHeight - 2;
  }

  return region.scrollTop > 2;
}

function isEditableTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest('input, textarea, select, button, [contenteditable="true"]'));
}

export function HomeScrollController() {
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 901px) and (min-height: 800px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let wheelTotal = 0;
    let wheelResetTimer: number | undefined;
    let unlockTimer: number | undefined;
    let locked = false;

    function move(direction: -1 | 1) {
      const sections = getSections();
      if (sections.length === 0 || locked) return;

      const currentIndex = getClosestSectionIndex(sections);
      const nextIndex = Math.max(0, Math.min(sections.length - 1, currentIndex + direction));
      if (nextIndex === currentIndex) return;

      locked = true;
      sections[nextIndex].scrollIntoView({
        behavior: reducedMotion.matches ? 'auto' : 'smooth',
        block: nextIndex === sections.length - 1 ? 'end' : 'start',
      });

      window.clearTimeout(unlockTimer);
      unlockTimer = window.setTimeout(() => {
        locked = false;
      }, reducedMotion.matches ? 120 : 850);
    }

    function handleWheel(event: WheelEvent) {
      if (!desktop.matches || event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      if (canScrollNestedRegion(event.target, event.deltaY)) return;

      event.preventDefault();
      if (locked) return;

      wheelTotal += event.deltaY;
      window.clearTimeout(wheelResetTimer);
      wheelResetTimer = window.setTimeout(() => {
        wheelTotal = 0;
      }, 140);

      if (Math.abs(wheelTotal) < 45) return;

      const direction = wheelTotal > 0 ? 1 : -1;
      wheelTotal = 0;
      move(direction);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (!desktop.matches || event.metaKey || event.ctrlKey || event.altKey || isEditableTarget(event.target)) return;

      const forward = event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ';
      const backward = event.key === 'ArrowUp' || event.key === 'PageUp';
      if (!forward && !backward) return;

      event.preventDefault();
      move(forward ? 1 : -1);
    }

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.clearTimeout(wheelResetTimer);
      window.clearTimeout(unlockTimer);
    };
  }, []);

  return null;
}
