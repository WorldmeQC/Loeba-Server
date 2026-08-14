import type {ReactNode} from 'react';
import {useEffect, useState, useCallback} from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type MinebbsStatus =
  | {
      status: 'online';
      host: string;
      version: string;
      protocol: number;
      players: {
        online: number;
        max: number;
        sample?: string;
      };
      delay: number;
      pureMotd?: string;
      motd?: {
        text?: string;
        extra?: Array<{text?: string; color?: string}>;
      };
    }
  | {
      status: 'offline';
      host?: string;
    };

function parseHostPort(serverIp: string): {ip: string; port: string} {
  if (serverIp.includes(':')) {
    const idx = serverIp.lastIndexOf(':');
    return {
      ip: serverIp.slice(0, idx),
      port: serverIp.slice(idx + 1),
    };
  }
  return {ip: serverIp, port: '25565'};
}

export default function ServerStatus(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  const serverIp = (siteConfig.customFields?.serverIp as string | undefined) ?? 'localhost';

  const [status, setStatus] = useState<MinebbsStatus | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const {ip, port} = parseHostPort(serverIp);

  const fetchStatus = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://motd.minebbs.com/api/status?ip=${encodeURIComponent(ip)}&port=${encodeURIComponent(port)}&stype=je&srv=false`,
      );
      const data = (await response.json()) as MinebbsStatus;
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '查询失败');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  }, [ip, port]);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  const isOnline = status?.status === 'online';
  const playerPercent =
    isOnline && status.players.max > 0
      ? Math.round((status.players.online / status.players.max) * 100)
      : 0;

  return (
    <section className={styles.statusSection}>
      <div className="container">
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <div className={styles.cardTitleWrap}>
              <Heading as="h2" className={styles.cardTitle}>
                服务器状态
              </Heading>
              <span
                className={clsx(styles.statusBadge, isOnline && styles.statusBadgeOnline)}>
                <span
                  className={styles.statusDot}
                  data-status={isOnline ? 'online' : 'offline'}
                />
                {loading ? '查询中' : isOnline ? '在线' : status ? '离线' : '等待查询'}
              </span>
            </div>
            {loading && <span className={styles.spinner} aria-label="查询中" />}
          </div>

          {error && (
            <div className={styles.offlineBox}>
              <p className={styles.offlineText}>查询失败：{error}</p>
            </div>
          )}

          {!error && status && (
            <>
              {isOnline && (
                <>
                  <div className={styles.playerCountRow}>
                    <div className={styles.playerCountMain}>
                      <span className={styles.playerCountValue}>
                        {status.players.online}
                      </span>
                      <span className={styles.playerCountMax}>
                        / {status.players.max}
                      </span>
                    </div>
                    <span className={styles.playerCountLabel}>在线玩家</span>
                  </div>

                  <div className={styles.progressWrap}>
                    <div
                      className={styles.progressBar}
                      style={{width: `${playerPercent}%`}}
                    />
                  </div>

                  <div className={styles.metrics}>
                    <div className={styles.metric}>
                      <span className={styles.metricValue}>{status.delay}</span>
                      <span className={styles.metricLabel}>ms 延迟</span>
                    </div>
                    <div className={styles.metric}>
                      <span className={styles.metricValue}>{status.version}</span>
                      <span className={styles.metricLabel}>版本</span>
                    </div>
                    <div className={styles.metric}>
                      <span className={styles.metricValue}>{status.protocol}</span>
                      <span className={styles.metricLabel}>协议版本</span>
                    </div>
                  </div>

                  {status.players.sample && (
                    <div className={styles.playerListBox}>
                      <span className={styles.playerListLabel}>当前在线</span>
                      <p
                        className={styles.playerListText}
                        title={status.players.sample}>
                        {status.players.sample}
                      </p>
                    </div>
                  )}
                </>
              )}

              {!isOnline && (
                <div className={styles.offlineBox}>
                  <p className={styles.offlineText}>
                    服务器当前离线，请稍后再试，或检查地址是否填写正确。
                  </p>
                </div>
              )}
            </>
          )}

          <div className={styles.serverAddress}>{serverIp}</div>
        </div>
      </div>
    </section>
  );
}
