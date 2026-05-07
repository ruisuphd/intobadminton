export type AuthenticityBrand = {
  name: "Yonex" | "VICTOR" | "Li-Ning";
  checkLabel: string;
  officialSourceName: string;
  officialSourceTitle: string;
  officialSourceUrl: string;
  officialQuote: string;
  accessedAt: string;
  steps: string[];
  limitation: string;
};

export const authenticityGuide = {
  title: "Badminton equipment authenticity checks",
  dek:
    "How to use official brand guidance when checking a racket, shoe, string, or shuttle purchase.",
  disclaimer:
    "IntoBadminton does not authenticate products, certify sellers, or guarantee that any serial number, code, sticker, receipt, or packaging detail proves a product is genuine.",
  buyerRule:
    "Treat these checks as a risk screen. The safest path is still an authorised retailer, a verifiable receipt, and direct brand or distributor support when the result is unclear.",
};

export const authenticityBrands: AuthenticityBrand[] = [
  {
    name: "Yonex",
    checkLabel: "Retailer, warranty card, support verification",
    officialSourceName: "Yonex USA",
    officialSourceTitle: "WARNING: Counterfeits",
    officialSourceUrl: "https://us.yonex.com/pages/spotting-counterfeits",
    officialQuote: "contact our customer support team for verification",
    accessedAt: "2026-05-07",
    steps: [
      "Buy through an authorised Yonex retailer whenever possible.",
      "Keep the receipt and any warranty card that identifies the authorised retailer.",
      "If a product looks suspicious, contact Yonex support rather than relying on a public serial-number lookup.",
    ],
    limitation:
      "I cannot confirm from an official Yonex source that Yonex offers a public badminton racket serial-number checker.",
  },
  {
    name: "VICTOR",
    checkLabel: "Shaft number and hologram guidance",
    officialSourceName: "VICTOR Badminton Global",
    officialSourceTitle: "SHAFT NUMBER",
    officialSourceUrl: "https://www.victorsport.com/page/shaft_number",
    officialQuote: "exclusive ID of each individual racket",
    accessedAt: "2026-05-07",
    steps: [
      "Check the shaft number at the bottom of the racket shaft.",
      "Compare the sales-area letters with the market where the racket was sold.",
      "Inspect the anti-counterfeit hologram and use local distributor support when the number or sticker looks inconsistent.",
    ],
    limitation:
      "VICTOR publishes shaft-number and hologram guidance, but the global FAQ still directs buyers towards official product guidance and certified distributors rather than a universal public checker.",
  },
  {
    name: "Li-Ning",
    checkLabel: "12-colour anti-counterfeiting code",
    officialSourceName: "Li-Ning",
    officialSourceTitle: "Anti-counterfeiting check system",
    officialSourceUrl: "https://mes.li-ning.com.cn/LNAC/LN_Anti_Query.aspx",
    officialQuote: "check the authenticity of the product here",
    accessedAt: "2026-05-07",
    steps: [
      "Find the 12-colour anti-counterfeiting code under the QR code.",
      "Enter the anti-counterfeiting code and verification code on Li-Ning's official query page.",
      "Compare the returned 12 digits with the product's 12 digits by both number and colour.",
    ],
    limitation:
      "The query system helps screen Li-Ning products, but a damaged, missing, repeated, or locked code still needs dealer or Li-Ning service follow-up.",
  },
];

