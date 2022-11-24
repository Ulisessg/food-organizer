import IndexContainer, { CardsContainer } from 'styles/pages/index.styles'
import Card from 'components/Card'
import Head from 'next/head'
import { Link } from 'd-system'
import Title from 'components/common/Title'

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
            <Link href="/admin/week" text="Administrar los menús de la semana" />
          </Card>
          <Card>
            <Link href="/admin/menu" text="Administrar menús" />
          </Card>
          <Card>
            <Link href="/admin/foods" text="Administrar comidas" />
          </Card>
          <Card>
            <Link href="/admin/stock" text="Ingredientes disponibles" />
          </Card>
          <Card>
            <Link href="/admin/unidades" text="Administar unidades de medida" />
          </Card>
          <Card>
            <Link href="/admin/ingredientes" text="Administar ingredientes" />
          </Card>
        </CardsContainer>
      </IndexContainer>

    </>
  )
}
