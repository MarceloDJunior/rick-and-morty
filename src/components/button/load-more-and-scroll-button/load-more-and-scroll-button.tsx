import { useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import ArrowDownSvg from '@/assets/arrow-down.svg';
import { CircleLoader } from '@/components/loaders/circle-loader';
import { Button } from '@/components/button';

import styles from './load-more-and-scroll-button.module.scss';

type LoadMoreAndScrollButtonProps = {
  onClick: () => void;
  isLoading?: boolean;
};

const scrollToBottom = () => {
  window.scrollTo({
    top: document.body.scrollHeight,
    behavior: 'smooth',
  });
};

export const LoadMoreAndScrollButton = ({ onClick, isLoading }: LoadMoreAndScrollButtonProps) => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  const buttonContent = useMemo(() => {
    if (isLoading) {
      return <CircleLoader size={38} />;
    }
    if (isAtBottom) {
      return 'Load more';
    }
    return <ArrowDownSvg />;
  }, [isAtBottom, isLoading]);

  const onButtonClick = useCallback(() => {
    if (isLoading) {
      return;
    }
    if (isAtBottom) {
      onClick();
    } else {
      scrollToBottom();
    }
  }, [isAtBottom, isLoading, onClick]);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const bottomThreshold = document.body.scrollHeight - 50;

      setIsAtBottom(scrollPosition >= bottomThreshold);
    };

    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) {
      setIsAtBottom(false);
    }
  }, [isLoading]);

  return (
    <div className={styles.container}>
      <Button
        className={classNames(styles.button, {
          [styles['load-more']]: isAtBottom && !isLoading,
          [styles.loading]: isLoading,
          [styles.scroll]: !isAtBottom && !isLoading,
        })}
        onClick={onButtonClick}
      >
        {buttonContent}
      </Button>
    </div>
  );
};
