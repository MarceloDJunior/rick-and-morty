import { useEffect, useState } from 'react';

import { DotsLoader } from '@/components/loaders';
import { useAlertContext } from '@/contexts/alert-context';
import { Episode } from '@/models/episode';
import { EpisodesService } from '@/services/episodes';

import styles from './episodes.module.scss';

type EpisodesProps = {
  urls: string[];
};

export const Episodes = ({ urls }: EpisodesProps) => {
  const { showAlert } = useAlertContext();
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const episodesNumbers: number[] = urls.map(url => {
      const number = url.split('/').pop();
      return Number(number);
    });

    const getEpisodes = async () => {
      try {
        setIsLoading(true);
        const episodes: Episode[] = await EpisodesService.getEpisodesByNumber(episodesNumbers);
        setEpisodes(episodes);
        setIsLoading(false);
      } catch (error) {
        showAlert();
      }
    };

    getEpisodes();
  }, [showAlert, urls]);

  return (
    <div className={styles.container}>
      <h2 className={styles.subtitle}>Episodes</h2>
      {isLoading && (
        <div className={styles.loader}>
          <DotsLoader />
        </div>
      )}
      <ul>
        {episodes.map(episode => (
          <li key={episode.id}>
            <div>
              {episode.episode} - {episode.name}{' '}
            </div>
            <div className={styles.date}>{episode.air_date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
