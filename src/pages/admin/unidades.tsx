/* eslint-disable max-lines-per-function */
import { Description, DescriptionContainer, Title } from 'styles/pages/unidades.styles'
import React, { FC } from 'react'
import CreateUnitsOfMeasure from 'components/CreateUnitsOfMeasure'
import CreateUnitsOfMeasureType from 'components/CreateUnitsOfMeasureType'
import DisplayUnitsOfMeasure from 'components/DisplayUnitsOfMeasure'
import Head from 'next/head'
import {
  UnitsOfMeasureContextProvider
} from 'context/unitsOfMeasureContext'

const Unidades: FC = () => <>
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

  <UnitsOfMeasureContextProvider>
    <CreateUnitsOfMeasure />
    <CreateUnitsOfMeasureType />
    <DisplayUnitsOfMeasure />
  </UnitsOfMeasureContextProvider>

  </>

export default Unidades
