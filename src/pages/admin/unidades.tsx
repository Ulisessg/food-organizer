/* eslint-disable max-lines-per-function */
import { Description, DescriptionContainer, Title } from 'styles/pages/unidades.styles'
import React, { FC, useContext } from 'react'
import {
  UnitsOfMeasureContext,
  UnitsOfMeasureContextProvider
} from 'context/unitsOfMeasureContext'
import CreateUnitsOfMeasure from 'components/CreateUnitsOfMeasure'
import CreateUnitsOfMeasureType from 'components/CreateUnitsOfMeasureType'
import DisplayUnitsOfMeasure from 'components/DisplayUnitsOfMeasure'
import ErrorMessage from 'components/common/ErrorMessage'
import Head from 'next/head'
import { LoadingSpinner } from 'd-system'

const Unidades: FC = () => <UnitsOfMeasureContextProvider>
    <Content />
  </UnitsOfMeasureContextProvider>

/** Component "Content" used to access UnitsOfMeasureContextProvider" */

const Content: FC = () => {
  const unitsOfMeasureContext = useContext(UnitsOfMeasureContext)
  return <>
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
   <CreateUnitsOfMeasure />
    <CreateUnitsOfMeasureType />

    {/* Display Uom */}
    {unitsOfMeasureContext.uomIsLoading && <LoadingSpinner size="large" />}

    {(!unitsOfMeasureContext.uomIsLoading && !unitsOfMeasureContext.errorGettingUom.error) &&
    <DisplayUnitsOfMeasure />}
    {(unitsOfMeasureContext.errorGettingUom.error &&
     !unitsOfMeasureContext.uomIsLoading) && <ErrorMessage
      message="Error obteniendo las unidades de medida"
      action="intenta de nuevo más tarde"
    />}
 </>
}

export default Unidades
