/**
 * Google Funding Choices — TCF v2 / IAB compliant CMP for EEA / UK / Switzerland
 * personalized-ads consent.
 *
 * Critical: this MUST render as literal <script> elements in static HTML, not
 * via next/script. Google's verification crawlers (AdSense, Funding Choices
 * itself) do not execute JavaScript, so next/script-injected tags are invisible
 * to them. We use plain <script> JSX so the SSR HTML contains the exact tags
 * Google expects.
 *
 * The script self-detects geo and only shows the consent message to users in
 * regulated regions, so loading it everywhere is intentional and harmless for
 * non-EEA traffic.
 */

const FC_PUB_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.replace(/^ca-/, "") ?? "";

const SIGNAL_SCRIPT = `(function() {
  function signalGooglefcPresent() {
    if (!window.frames['googlefcPresent']) {
      if (document.body) {
        const iframe = document.createElement('iframe');
        iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;';
        iframe.style.display = 'none';
        iframe.name = 'googlefcPresent';
        document.body.appendChild(iframe);
      } else {
        setTimeout(signalGooglefcPresent, 0);
      }
    }
  }
  signalGooglefcPresent();
})();`;

export function FundingChoicesScript() {
  if (!FC_PUB_ID) return null;

  return (
    <>
      <script
        async
        src={`https://fundingchoicesmessages.google.com/i/${FC_PUB_ID}?ers=1`}
      />
      <script dangerouslySetInnerHTML={{ __html: SIGNAL_SCRIPT }} />
    </>
  );
}
