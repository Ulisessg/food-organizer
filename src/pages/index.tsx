import Head from 'next/head'

export default function Home (): JSX.Element {
  return <div >
    <Head key={0}>
        <title>
            Food Organizer
        </title>

        <meta
            content="Aministra tus comidas eficientemente"
            name="description"
        />

        <link
            href="/favicon.ico"
            rel="icon"
        />
    </Head>

    <main role="main" />
  </div>
}
