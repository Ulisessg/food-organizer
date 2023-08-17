/* eslint-disable @next/next/no-img-element */
import React, { type FC, Fragment } from 'react'
import { ButtonOpenModal } from 'components/web/common/ModalUpdateData'
import { type RootState } from 'redux/store'
import SystemImage from 'components/web/common/SystemImage'
import { Td } from 'd-system'
import randomId from 'utils/randomId'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

const Rows: FC = () => {
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients)
  return <>
   {ingredients.map(({
     comment, ingredient_id, image,
     ingredient_name, uom_name,
     ingr_purchase_places
   }, index) => <Fragment key={ingredient_id}>
        <TrStyles className="table-content">
            <Td>{ingredient_name}</Td>
            <Td>
              <SystemImage
                fileName={image as string}
                table="ingredients"
                imageIsInTemporal={false} />
            </Td>
            <Td>{comment ?? ''}</Td>
            <Td>{uom_name}</Td>
            {(() => {
              if (ingr_purchase_places.length >= 1) {
                return ingr_purchase_places?.map((pp) => <Fragment key={randomId()}>
                <Td
                  className={
                    (ingr_purchase_places.length > 1) && 'ingredient_purchase_places' as any}
                >{pp.purchase_place_name}</Td>
              </Fragment>)
              }
              return <Td></Td>
            })()}
            {/* Purchase places */}
              <Td>
              <ButtonOpenModal
                elementIndex={index}
                groupingElementIndex={null}
                size="small"
                text="Editar"
              />
              </Td>
          </TrStyles>
        </Fragment>)}
        </>
}

const TrStyles = styled.tr`
.ingredient_purchase_places {
  display: flex;
  justify-content: center;
  &:not(:nth-last-child(2)) {
    border-bottom: 1px solid ${({ theme }) => theme.colors.dark2};
  }
}
.no_grid {
  display: table-cell;
  margin: 10px;
  &[data-is-active=true] {
    & button {margin-top: 10px}
  }
}
`

export default Rows
