import { useCallback, useEffect, useRef, useState } from 'react';
import { AuthorizedUrlInfo } from './types';
import { createEmbedTokensMessage } from './utils';

export interface InventiveContentProps {
  urlInfo?: AuthorizedUrlInfo;
  referenceUrl?: string;
}

export const InventiveContent = ({
  urlInfo,
  referenceUrl,
}: InventiveContentProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [embedContentInited, setEmbedContentInited] = useState(false);

  const handleEmbedContentReady = useCallback(
    (event: MessageEvent) => {
      // nothing to do if urlInfo is not provided or embed content is already initialized
      if (!urlInfo || embedContentInited) return;

      const targetOrigin = new URL(urlInfo.url).origin;
      if (event.origin !== targetOrigin) {
        // ignore messages from other origins
        return;
      }

      const { type } = event.data;
      if (type !== 'embed_content_ready') {
        // ignore messages with other types
        return;
      }

      const iframe = iframeRef.current;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          createEmbedTokensMessage(urlInfo.tokens, referenceUrl),
          targetOrigin
        );
        setEmbedContentInited(true);
      }
    },
    [embedContentInited, urlInfo]
  );

  useEffect(() => {
    window.addEventListener('message', handleEmbedContentReady);
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('message', handleEmbedContentReady);
    };
  }, [handleEmbedContentReady]);

  if (!urlInfo) return null;
  return (
    <iframe
      ref={iframeRef}
      src={urlInfo.url}
      title="Inventive Site"
      width="100%"
      height="100%"
      frameBorder="0"
      allow="clipboard-write"
    />
  );
};
