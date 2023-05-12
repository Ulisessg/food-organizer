/* eslint-disable max-lines-per-function */
import {
  InputModalUpdateData,
  InputsContainer,
  InputsSectionTitle
} from 'components/web/common/ModalUpdateData'
import React, { type FC, Fragment } from 'react'
import { type RootState } from 'redux/store'
import { type UseInputsContextProps } from 'd-system'
import getPatterExcludeWords from 'utils/getPatterExcludWords'
import randomId from 'utils/randomId'

const ModalContent: FC<ModalContentProps> = ({
  selectedUomt,
  unitOfMeasureTypeIndex
}) => {
  const setValueToLowerCase:
  UseInputsContextProps['onChageCallback'] = (_ev, inputValue) => inputValue
    .toLowerCase()
  const selectedUomtId = `${selectedUomt?.uomt_id}`

  return <>
<InputsContainer
  inputsContainerProps={{
    dbTable: 'units_of_measure_type',
    elementId: selectedUomtId as any,
    elementIndex: unitOfMeasureTypeIndex,
    inputsNames: [selectedUomtId]
  }}
  initialInputs={{}}
  onChageCallback={setValueToLowerCase}
  reportValidity={true}
>
  <InputsSectionTitle>Tipo de unidad de medida</InputsSectionTitle>
  <InputModalUpdateData
    type="input"
    inputProps={{
      acceptanceCriteria: 'Solo letras y números, valor inicial no valido',
      id: selectedUomtId,
      label: 'Nombre',
      name: selectedUomtId,
      pattern: `^${getPatterExcludeWords([selectedUomt?.uomt_name])}([\\p{L}\\s]+)$`,
      required: true
    }}
    initialValue={selectedUomt?.uomt_name}
    field="name"
  />
  </InputsContainer>

  {selectedUomt
    ?.uom
    .map((unitOfMeasure, unitOfMeasureIndex) => <Fragment key={randomId(unitOfMeasure.id as any)}>
    <InputsContainer
      inputsContainerProps={{
        dbTable: 'units_of_measure',
        elementId: unitOfMeasure.id,
        elementIndex: unitOfMeasureIndex,
        groupingElementIndex: unitOfMeasureTypeIndex,
        inputsNames: [
          unitOfMeasure.name,
          unitOfMeasure.abbreviation
        ]

      }}

      initialInputs={{}}
      onChageCallback={setValueToLowerCase}
      reportValidity={true}
    >
    <InputsSectionTitle>Unidad de medida</InputsSectionTitle>
      <InputModalUpdateData
        inputProps={{
          acceptanceCriteria: 'Solo letras y números, valor inicial no valido',
          id: unitOfMeasure.name,
          label: 'Nombre',
          name: unitOfMeasure.name,
          pattern: `^${getPatterExcludeWords(selectedUomt?.uomNames)}([\\p{L}\\s]+)$`,
          required: true
        }}
        type="input"
        initialValue={unitOfMeasure.name}
        field="name"
      />
      <InputModalUpdateData
        inputProps={{
          acceptanceCriteria: 'Solo letras y números, valor inicial no valido',
          id: unitOfMeasure.abbreviation,
          label: 'Abreviación',
          name: unitOfMeasure.abbreviation,
          pattern: `^${getPatterExcludeWords(selectedUomt?.uomAbbreviations)}([\\p{L}\\s]+)$`,
          required: true
        }}
        type="input"
        initialValue={unitOfMeasure.abbreviation}
        field="abbreviation"
      />
    </InputsContainer>

    </Fragment>)}
  </>
}

export default ModalContent

interface ModalContentProps {
  selectedUomt: RootState['unitsOfMeasure']['uomGroupedByType'][0]
  unitOfMeasureTypeIndex: number
}
