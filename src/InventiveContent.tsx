import { useEffect, useRef } from 'react';
import { AuthorizedUrlInfo } from './types';
import { createEmbedTokensMessage } from './utils';

export interface InventiveContentProps {
  urlInfo?: AuthorizedUrlInfo;
}

export const InventiveContent = (props: InventiveContentProps) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  const { urlInfo } = props;

  useEffect(() => {
    // nothing to do if urlInfo is not provided
    if (!urlInfo) return;

    const targetOrigin = new URL(urlInfo.url).origin;

    const iframe = iframeRef.current;
    const postMessageToIframe = () => {
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage(
          createEmbedTokensMessage(urlInfo.tokens),
          targetOrigin,
        );
      }
    };

    // Add event listener to post message when iframe is loaded
    if (iframe) {
      iframe.addEventListener('load', postMessageToIframe);
    }

    // Cleanup the event listener on component unmount
    return () => {
      if (iframe) {
        iframe.removeEventListener('load', postMessageToIframe);
      }
    };
  }, [urlInfo]);

  if (!urlInfo) return null;
  return (
    <iframe
      ref={iframeRef}
      src={urlInfo.url}
      title='Inventive Site'
      width='100%'
      height='100%'
      frameBorder='0'
    />
  );
};
