import type {ReactNode} from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

export default function ShowcaseGallery(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const images = (siteConfig.customFields?.showcaseImages as string[] | undefined) ?? [];

  if (images.length === 0) {
    return (
      <section className={styles.showcaseSection}>
        <div className="container">
          <Heading as="h2" className={styles.sectionTitle}>
            服务器掠影
          </Heading>
          <p className={styles.emptyHint}>
            暂无展示图片。把图片放入 <code>static/img/showcase/</code> 目录后，这里会自动滚动展示。
          </p>
        </div>
      </section>
    );
  }

  // 复制多份图片，让轨道足够长，滚动更自然
  const trackImages = Array.from({length: 4}).flatMap(() => images);

  return (
    <section className={styles.showcaseSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          服务器掠影
        </Heading>
        <p className={styles.sectionSubtitle}>
          玩家作品与服务器内的精彩瞬间
        </p>
        <div className={styles.galleryBox}>
          <div className={styles.galleryTrack}>
            {trackImages.map((src, idx) => (
              <div key={`${src}-${idx}`} className={styles.imageCard}>
                <img src={useBaseUrl(src)} alt={`服务器截图 ${(idx % images.length) + 1}`} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
