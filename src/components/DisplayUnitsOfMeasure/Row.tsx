/* eslint-disable max-lines-per-function */
import { Input, Td, type useInputs } from 'd-system'
import React,
{ type ComponentPropsWithRef, type FC, type MouseEvent, useContext } from 'react'
import EditTableButtons from 'components/common/EditTableButtons'
import { EditTableRowContext } from 'context/EditTableRowContext'
import dynamic from 'next/dynamic'
import safeObjectGet from 'utils/safeObjectGet'
import styled from 'styled-components'
import useDisplayUOMRow from 'hooks/components/useDisplayUOMRow'

const ArrowBack = dynamic(
  async () => {
    const Component = await import('components/common/ArrowBack')
    return Component
  },
  { ssr: false }
)

export const RowWithSpan: FC<RowWithSpanProps> = ({
  rowSpan,
  uomAbbreviation,
  uomId,
  uomName,
  uomtId, uomtName
}) => {
  const editTableRowContext = useContext(EditTableRowContext)
  const {
    onClickUpdate,
    inputsData,
    onChangeInputs,
    onBlurInputs,
    inputsErrors,
    restartInputs
  } = useDisplayUOMRow(
    uomAbbreviation,
    uomName,
    uomtName
  )
  return <tr
    data-edit-row={editTableRowContext.allowEdit}
    data-uom-id={uomId}
    data-uomt-id={uomtId}
  >
    <TdComponent
      label="Tipo de unidad"
      restartInput={restartInputs as any}
      allowEdit={editTableRowContext.allowEdit}
      inputMode="text"
      inputType="text"
      inputsData={inputsData}
      inputsErrors={inputsErrors}
      onBlur={onBlurInputs}
      onChange={onChangeInputs}
      pattern="^[\p{L}\s]+$"
      table="units_of_measure_types"
      value={uomtName}
      rowSpan={rowSpan}

    />

  <TdComponent
    label="Nombre"
    restartInput={restartInputs as any}
    allowEdit={editTableRowContext.allowEdit}
    inputMode="text"
    inputType="text"
    inputsData={inputsData}
    inputsErrors={inputsErrors}
    onBlur={onBlurInputs}
    onChange={onChangeInputs}
    pattern="^[\p{L}\s]+$"
    table="units_of_measure"
    value={uomName}
    dataField="name"
  />
  <TdComponent
    restartInput={restartInputs as any}
    label="Abreviacion"
    allowEdit={editTableRowContext.allowEdit}
    inputMode="text"
    inputType="text"
    inputsData={inputsData}
    inputsErrors={inputsErrors}
    onBlur={onBlurInputs}
    onChange={onChangeInputs}
    pattern="^[\p{L}\s]+$"
    table="units_of_measure"
    value={uomAbbreviation}
    dataField="abbreviation"
  />

  <Td hidden={typeof rowSpan === 'undefined'} rowSpan={rowSpan}>

    <EditTableButtons onUpdate={onClickUpdate}
      editProp={editTableRowContext.allowEdit}
      handleEditProp={editTableRowContext.toggleAllowEdit} />
  </Td>
</tr>
}

export const RowNoSpan: FC<RowNoSpanProps> = ({
  uomAbbreviation,
  uomId,
  uomName,
  uomtName
}) => {
  const editTableRowContext = useContext(EditTableRowContext)
  const {
    inputsData,
    onChangeInputs,
    onBlurInputs,
    inputsErrors,
    restartInputs
  } = useDisplayUOMRow(
    uomAbbreviation,
    uomName,
    uomtName
  )
  return <>
  <tr data-edit-row={editTableRowContext.allowEdit}>
  <TdComponent
    label="Nombre"
    restartInput={restartInputs as any}
    allowEdit={editTableRowContext.allowEdit}
    inputMode="text"
    inputType="text"
    inputsData={inputsData}
    inputsErrors={inputsErrors}
    onBlur={onBlurInputs}
    onChange={onChangeInputs}
    pattern="^[\p{L}\s]+$"
    table="units_of_measure"
    value={uomName}

    dataField="name"
  />
  <TdComponent
    label="Abreviacion"
    restartInput={restartInputs as any}
    allowEdit={editTableRowContext.allowEdit}
    inputMode="text"
    inputType="text"
    inputsData={inputsData}
    inputsErrors={inputsErrors}
    onBlur={onBlurInputs}
    onChange={onChangeInputs}
    pattern="^[\p{L}\s]+$"
    table="units_of_measure"
    value={uomAbbreviation}

    dataField="abbreviation"
  />
</tr>
  </>
}

const TdComponent: FC<TdComponentProps> = ({
  allowEdit,
  inputMode,
  inputType,
  inputsData,
  label,
  onBlur,
  onChange,
  table,
  value,
  inputsErrors,
  pattern,
  rowSpan,
  restartInput,
  dataField
}) => {
  const restartInputHandler = (ev: MouseEvent<HTMLButtonElement>): void => {
    const inputName = ev.currentTarget.getAttribute('data-input-name') as string
    restartInput(inputName)
  }
  return <Td rowSpan={rowSpan} data-table={table}>
  {!allowEdit && value}

  {allowEdit && <TDComponentInputContainer>
    <Input
      id={value}
      label={label}
      name={value}
      value={safeObjectGet(
        inputsData,
        value
      )}
      onChange={onChange}
      inputInvalid={safeObjectGet(
        inputsErrors,
        value
      )}
      pattern={pattern}
      onBlur={onBlur}
      style={{ marginBottom: '40px', textTransform: 'capitalize' }}
      type={inputType}
      inputMode={inputMode}
      // Data attributes
      data-table={table}
      data-initial-value={value}
      data-field={dataField}
      data-value-changed={(value !== safeObjectGet(
        inputsData,
        value
      ))}
  />
     <ArrowBack
      title="Deshacer cambios"
      type="button"
      data-input-name={value}
      onClick ={restartInputHandler}
      disabled={value === safeObjectGet(
        inputsData,
        value
      )}
      hidden={value === safeObjectGet(
        inputsData,
        value
      )}
    />
  </TDComponentInputContainer>
  }
</Td>
}

const TDComponentInputContainer = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 20px;
  align-items: center;
`

interface TdComponentProps {
  allowEdit: boolean
  inputsData: Record<string, string>
  value: string
  label: string
  onChange: ReturnType<typeof useInputs>['onChange']
  onBlur: ReturnType<typeof useInputs>['onBlur']
  inputType: ComponentPropsWithRef<'input'>['type']
  inputMode: ComponentPropsWithRef<'input'>['inputMode']
  table: string
  inputsErrors: Record<string, boolean>
  pattern: string
  rowSpan?: number
  restartInput: (inputName: string) => void
  dataField?: TDataFields
}

interface RowWithSpanProps extends RowCommonProps {
  rowSpan: number
  uomtId: number
}

interface RowNoSpanProps extends RowCommonProps {

}

/** Fileds on units of measure table on database */
export type TDataFields = 'name' | 'abbreviation'

interface RowCommonProps {

  /** "uomtName" used for consistency in "useDisplayUOMRows" hook */
  uomtName: string
  uomName: string
  uomAbbreviation: string
  uomId: number
}
