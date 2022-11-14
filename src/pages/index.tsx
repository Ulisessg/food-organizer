import IndexContainer, { CardsContainer, Title } from 'styles/pages/index.styles'
import Card from 'components/Card'
import Head from 'next/head'
import { Link } from 'd-system'

export default function Home (): JSX.Element {
  return (
    <>
      <Head key={0}>
        <title>Food Organizer</title>

        <meta
          content="Aministra tus comidas eficientemente"
          name="description"
        />

        <link href="/favicon.ico" rel="icon" />
      </Head>
      <IndexContainer>
        <Title>Food Organizer</Title>
        <CardsContainer>
          <Card>
            <Link href="/admin/unidades" text="Administar unidades de medida" />
          </Card>
        </CardsContainer>
      </IndexContainer>

    </>
  )
}
