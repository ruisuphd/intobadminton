import Script from "next/script";

/**
 * Google Funding Choices — TCF v2 / IAB compliant CMP for EEA / UK / Switzerland
 * personalized-ads consent. Loads on every page; the script self-detects geo
 * and only shows the consent message to users in regulated regions.
 *
 * Pairs with <ConsentModeDefaults/> (which sets ad_storage / ad_user_data /
 * ad_personalization to 'denied' as defaults via gtag) and the AdSense main
 * loader. The combination is what AdSense reviewers expect to see for
 * EEA-traffic compliant sites.
 *
 * The publisher ID hardcoded in the URL must match NEXT_PUBLIC_ADSENSE_CLIENT.
 * If you ever rotate publisher IDs, update both.
 */

const FC_PUB_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.replace(/^ca-/, "") ?? "";

export function FundingChoicesScript() {
  if (!FC_PUB_ID) return null;

  return (
    <>
      <Script
        id="google-funding-choices"
        async
        strategy="afterInteractive"
        src={`https://fundingchoicesmessages.google.com/i/${FC_PUB_ID}?ers=1`}
      />
      <Script id="google-funding-choices-signal" strategy="afterInteractive">
        {`(function() {
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
})();`}
      </Script>
    </>
  );
}
