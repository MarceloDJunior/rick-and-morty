import { useCallback, useEffect, useRef, useState } from 'react';

import { AnimatedScale } from '@/components/animated-scale';
import { ScrollHelper } from '@/helpers/scroll-helper';
import { useOnClickOutside } from '@/hooks/use-on-click-outside';

import styles from './modal.module.scss';

type ModalProps = {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
};

const MODAL_ANIMATION_DURATION = 300;

export const Modal = ({ title, children, onClose }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [animationType, setAnimationType] = useState<'in' | 'out'>('in');

  const onRequestClose = useCallback(() => {
    setAnimationType('out');
    setTimeout(() => {
      onClose();
    }, MODAL_ANIMATION_DURATION);
  }, [onClose]);

  useOnClickOutside(modalRef, onRequestClose);

  useEffect(() => {
    ScrollHelper.disableScroll();
    return () => {
      ScrollHelper.enableScroll();
    };
  }, []);

  return (
    <div className={styles.backdrop}>
      <AnimatedScale
        duration={MODAL_ANIMATION_DURATION}
        type={animationType}
        className={styles.container}
      >
        <div
          role="dialog"
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          className={styles.modal}
          ref={modalRef}
        >
          <div className={styles.header}>
            <h2 id="dialog-title" className={styles.title}>
              {title}
            </h2>
            <button onClick={onRequestClose}>&times;</button>
          </div>
          <div id="dialog-description" className={styles.content}>
            {children}
          </div>
        </div>
      </AnimatedScale>
    </div>
  );
};
