import type { AppProps } from "next/app";
import { GlobalStyles } from "d-system";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyles footer>
        <Component {...pageProps} />
      </GlobalStyles>
    </>
  );
}

export default MyApp;
