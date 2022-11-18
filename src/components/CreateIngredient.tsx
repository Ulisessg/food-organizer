/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable camelcase */
import { Button, FileInput, Form, LoadingSpinner, TextInput } from 'd-system'
import React, { FC, Fragment } from 'react'
import Details from './common/Details'
import ErrorMessage from './common/ErrorMessage'
import { GetPurchasePlaces } from 'controllers/food_organizer_crud/purchasePlaceCRUD'
import { GetUOM } from 'controllers/food_organizer_crud/unitsOfMeasureCRUD'
import Select from './common/Select'
import useGetRequest from 'hooks/useGetRequest'

// eslint-disable-next-line max-lines-per-function
const CreateIngredient: FC = () => {
  const { data, error, isLoading } = useGetRequest<GetPurchasePlaces>('/api/purchase')
  const { data: uomData, error: uomError, isLoading: uomIsLoading } = useGetRequest('/api/uom')
  const dta = data as GetPurchasePlaces
  const uomList = uomData as GetUOM

  return <>
  <Details summary="Crear ingrediente">
    <Form title="Crear ingrediente">
      <TextInput
        id="ingredient_name"
        inputMode="text"
        label="Nombre del ingrediente"
        name="ingredient_name"
        placeholder="Arroz, azucar, leche..."
        type="text"
      />

      {/* Purchase places */}

      {error && <ErrorMessage
          message="Error obteniendo lugares de compra"
          action="intenta de nuevo mas tarde"
        />
      }
      {isLoading && <LoadingSpinner size="small" />}

      {(!isLoading && !error) &&
      <Select id="select_purchase_place" labelText="Selecciona un lugar de compra">
        {dta.map(({ id, name }) => <Fragment key={id}>
          <option value={name}>{name}</option>
        </Fragment>)}
      </Select> }

      {/* Units Of Measure */}

      {uomIsLoading && <LoadingSpinner size="small" />}
      {uomError && <ErrorMessage
          message="Error obteniendo unidades de medida"
          action="intenta de nuevo mas tarde"
        />
      }
      {(!uomIsLoading && !uomError) &&
      <Select id="select_uom" labelText="Selecciona una unidad de medida">
       {uomList.map(({ uomt_id, uomt_name, uom }) => <Fragment key={uomt_id}>
          <optgroup label={uomt_name}>
            {uom.map(({ id, name }) => <Fragment key={id}>
              <option value={name}>{name}</option>
            </Fragment>)}
          </optgroup>
       </Fragment>)}
      </Select> }
      <TextInput
        id="ingredient_comment"
        inputMode="text"
        label="Comentario (opcional)"
        name="ingredient_comment"
        placeholder="Naturales, sin sal, añejo..."
        type="text"
      />
      <FileInput
        accept="image/*"
        id="ingredient_image"
        inputMode="numeric"
        label="Imagen (opcional)"
        name="ingredient_image"
        placeholder="Tomate.png"
        type="file"
      />
      <Button
        colorMessage="continue"
        size="100%"
        text="Crear ingrediente"
        type="button"
      />
    </Form>
  </Details>
</>
}
export default CreateIngredient
