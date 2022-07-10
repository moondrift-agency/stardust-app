import React, { ReactElement } from "react";
import Document, {
  Html,
  Head,
  Main,
  NextScript
} from "next/document";

// NEXT.JS CUSTOM DOCUMENT
// https://nextjs.org/docs/advanced-features/custom-document

export default class MyDocument extends Document {
  render(): ReactElement {
    return (
      <Html lang="fr">
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:ital,wght@0,200;0,300;0,400;0,600;0,700;0,900;1,200;1,300;1,400;1,600;1,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <meta
            name="title"
            content="Stardust"
          />
          <meta name="description" content="Réseau social du serveur discord de Stardust" />
          <meta property="og:type" content="website" />
          <meta
            property="og:title"
            content="Stardust"
          />
          <meta property="og:description" content="Réseau social du serveur discord de Stardust" />
          <meta property="og:image" content="" />
          <meta property="twitter:card" content="summary_large_image" />
          <meta
            property="twitter:title"
            content="Stardust"
          />
          <meta property="twitter:description" content="Réseau social du serveur discord de Stardust" />
          <meta property="twitter:image" content="" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
