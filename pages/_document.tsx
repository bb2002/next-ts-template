import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document from 'next/document';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: any) {
    const styledComponentsSheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () => {
        originalRenderPage({
          enhanceApp: (App: any) => (props: any) => styledComponentsSheet.collectStyles(<App {...props} />)
        })
      }

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
          </React.Fragment>
        )
      }
    } finally {
      styledComponentsSheet.seal()
    }
  }
}