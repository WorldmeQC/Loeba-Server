import type {ReactNode} from 'react';
import {useState, useEffect, useRef} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import ServerStatus from '@site/src/components/ServerStatus';
import ShowcaseGallery from '@site/src/components/ShowcaseGallery';

import styles from './index.module.css';

type FeatureItem = {
  title: string;
  emoji: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: '生电',
    emoji: '⚡',
    description: '红石机械、自动农场、全物品分类，让方块世界自己运转起来。',
  },
  {
    title: '养老',
    emoji: '🏠',
    description: '悠闲建造、种田养花、和朋友一起慢慢生活，节奏由你掌控。',
  },
  {
    title: '休闲',
    emoji: '☕',
    description: '没有压力，没有逼肝，随时上线都能找到放松的乐趣。',
  },
  {
    title: '自定义内容',
    emoji: '🎨',
    description: '服务器持续更新自研插件与原创玩法，每次登录都有新惊喜。',
  },
  {
    title: '自研插件',
    emoji: '🔧',
    description: '我们亲手编写插件，只为打造更贴合社区、独一无二的列巴工坊。',
  },
  {
    title: '友好社区',
    emoji: '🌱',
    description: '友善的玩家氛围，活跃的交流群，让新人也能快速融入。',
  },
  {
    title: '长期运营',
    emoji: '📅',
    description: '稳定开服，长期存档，你的每一次创造都值得被保留。',
  },
  {
    title: '公平环境',
    emoji: '⚖️',
    description: '不卖破坏平衡的数值道具，人人都有同样的游戏体验。',
  },
];

function FloatingBlocks() {
  return (
    <div className={styles.floatingBlocks} aria-hidden="true">
      {Array.from({length: 12}).map((_, i) => (
        <span
          key={i}
          className={styles.block}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${6 + Math.random() * 6}s`,
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            opacity: 0.06 + Math.random() * 0.08,
          }}
        />
      ))}
    </div>
  );
}

function HeroBanner() {
  const {siteConfig} = useDocusaurusContext();
  const serverIp = (siteConfig.customFields?.serverIp as string | undefined) ?? '';
  const serverVersion = (siteConfig.customFields?.serverVersion as string | undefined) ?? '';

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!serverIp) return;
    try {
      await navigator.clipboard.writeText(serverIp);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <header className={styles.heroBanner}>
      <FloatingBlocks />
      <div className={clsx('container', styles.heroContainer)}>
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroMeta}>
          <span className={styles.heroBadge}>版本 {serverVersion}</span>
        </div>
        <div className={styles.heroButtons}>
          <button
            type="button"
            className={clsx('button', 'button--lg', styles.copyButton, {
              [styles.copied]: copied,
            })}
            onClick={handleCopy}>
            {copied ? '已复制地址 ✓' : `复制服务器地址 ${serverIp}`}
          </button>
          <Link
            className={clsx('button', 'button--secondary', 'button--lg', styles.docButton)}
            to="/docs/intro">
            查看文档
          </Link>
        </div>
      </div>
    </header>
  );
}

function FeatureCard({title, emoji, description, index}: FeatureItem & {index: number}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      {threshold: 0.15, rootMargin: '0px 0px -40px 0px'},
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={clsx(styles.featureCard, visible && styles.featureCardVisible)}
      style={{transitionDelay: `${index * 80}ms`}}>
      <div className={styles.featureIcon}>{emoji}</div>
      <Heading as="h3" className={styles.featureTitle}>
        {title}
      </Heading>
      <p className={styles.featureDescription}>{description}</p>
    </div>
  );
}

function HomepageFeatures() {
  return (
    <section className={styles.featuresSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          玩法特色
        </Heading>
        <p className={styles.sectionSubtitle}>
          生电 · 养老 · 休闲 · 自定义内容
        </p>
        <div className={styles.featuresGrid}>
          {FeatureList.map((props, idx) => (
            <FeatureCard key={props.title} {...props} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 首页`}
      description="Loeba 列巴工坊 Minecraft 服务器：生电、养老、休闲、自定义内容、自研插件持续更新。">
      <HeroBanner />
      <main>
        <HomepageFeatures />
        <ShowcaseGallery />
        <ServerStatus />
      </main>
    </Layout>
  );
}
