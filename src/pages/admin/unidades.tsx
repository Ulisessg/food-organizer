/* eslint-disable max-lines-per-function */
import { Description, DescriptionContainer, Title } from 'styles/pages/unidades.styles'
import React, { FC, ReactNode } from 'react'
import CreateUnitsOfMeasure from 'components/CreateUnitsOfMeasure'
import DisplayUnitsOfMeasure from 'components/DisplayUnitsOfMeasure'
import ErrorMessage from 'components/common/ErrorMessage'
import type { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'
import getUomtFromRequest from 'utils/getUomtFromRequest'
import useGetRequest from 'hooks/useGetRequest'

const Unidades: FC = () => {
  const { data, error, isLoading } = useGetRequest<GetUOM>('/api/uom')
  if (isLoading) {
    return <Common>
        <LoadingSpinner size="large" />
      </Common>
  } else if (error) {
    return <Common>
        <ErrorMessage
          message={data as string}
          action="intenta de nuevo en unos momentos 😀"/>
      </Common>
  }

  return <Common>
    <>
      <h2>Instrucciones</h2>

      <DescriptionContainer>
        <Description>
          1. Utiliza la tabla de abajo, solo debes presionar el boton&nbsp;
          <b>&quot;Editar&quot;</b>
        </Description>

        <Description>
          2. Para confirmar los cambios presiona el boton&nbsp;
          <b>&quot;Actualizar&quot;</b>
        </Description>

        <Description>
          3. Si te arrepientes y no quieres cambiar nada solo presiona el boton&nbsp;
          <b>&quot;Cancelar&quot;</b>
        </Description>
      </DescriptionContainer>
      <CreateUnitsOfMeasure unitsOfMeasureTypes={getUomtFromRequest(data as GetUOM)} />
      <DisplayUnitsOfMeasure unitsOfMeasureTypes={data as GetUOM} />
    </>
  </Common>
}

const Common: FC<CommonProps> = ({ children }: CommonProps) => <>

  <Head>
    <title>Administrar unidades de medida</title>
  </Head>
  <Title>Administrar unidades de medida</Title>
  <DescriptionContainer>
    <Description>Hey! te doy la bienvenida, desde aqui podras administar las unidades de medida.
    </Description>
    <Description>
    Puedes crear nuevas unidades de medida, actualizar las existentes
    o eliminar las que no utilices siempre que desees!
    </Description>
  </DescriptionContainer>
  {children}
</>

interface CommonProps {
  children: ReactNode
}

export default Unidades
