import Table from './Table'
import { invalidPropertyTypeErrorMessage } from 'utils/ErrorMessages'

class WeeklyMenu extends Table {
  private mondayMenuId: number
  private tuesdayMenuId: number
  private wednesdayMenuId: number
  private thursdayMenuId: number
  private fridayMenuId: number
  private saturdayMenuId: number
  private sundayMenuId: number

  // eslint-disable-next-line max-params, max-lines-per-function, max-statements
  constructor (
    allowModifications: boolean,
    id: number | null,
    mondayMenuId: number,
    tuesdayMenuId: number,
    wednesdayMenuId: number,
    thursdayMenuId: number,
    fridayMenuId: number,
    saturdayMenuId: number,
    sundayMenuId: number
  ) {
    super(
      allowModifications,
      id,
      'weekly_menus'
    )
    this.verifyProperties(
      'fridayMenuId',
      fridayMenuId
    )
    this.verifyProperties(
      'mondayMenuId',
      mondayMenuId
    )
    this.verifyProperties(
      'saturdayMenuId',
      saturdayMenuId
    )
    this.verifyProperties(
      'sundayMenuId',
      sundayMenuId
    )
    this.verifyProperties(
      'thursdayMenuId',
      thursdayMenuId
    )
    this.verifyProperties(
      'tuesdayMenuId',
      tuesdayMenuId
    )
    this.verifyProperties(
      'wednesdayMenuId',
      wednesdayMenuId
    )
    this.mondayMenuId = mondayMenuId
    this.tuesdayMenuId = tuesdayMenuId
    this.wednesdayMenuId = wednesdayMenuId
    this.thursdayMenuId = thursdayMenuId
    this.fridayMenuId = fridayMenuId
    this.saturdayMenuId = saturdayMenuId
    this.sundayMenuId = sundayMenuId
  }

  // Setters
  setMondayMenuId (id: number): number {
    this.preventModifications()
    this.verifyProperties(
      'mondayMenuId',
      id
    )
    this.mondayMenuId = id
    return this.mondayMenuId
  }

  setTuesdayMenuId (id: number): number {
    this.preventModifications()

    this.verifyProperties(
      'tuesdayMenuId',
      id
    )
    this.tuesdayMenuId = id
    return this.tuesdayMenuId
  }

  setWednesdayMenuId (id: number): number {
    this.preventModifications()

    this.verifyProperties(
      'wednesdayMenuId',
      id
    )
    this.wednesdayMenuId = id
    return this.wednesdayMenuId
  }

  setThursdayMenuId (id: number): number {
    this.preventModifications()

    this.verifyProperties(
      'thursdayMenuId',
      id
    )
    this.thursdayMenuId = id
    return this.thursdayMenuId
  }

  setFridayMenuId (id: number): number {
    this.preventModifications()

    this.verifyProperties(
      'fridayMenuId',
      id
    )
    this.fridayMenuId = id
    return this.fridayMenuId
  }

  setSaturdayMenuId (id: number): number {
    this.preventModifications()

    this.verifyProperties(
      'saturdayMenuId',
      id
    )
    this.saturdayMenuId = id
    return this.saturdayMenuId
  }

  setSundayMenuId (id: number): number {
    this.preventModifications()
    this.verifyProperties(
      'sundayMenuId',
      id
    )
    this.sundayMenuId = id
    return this.sundayMenuId
  }

  // Getters

  get getMondayMenuId (): number {
    return this.mondayMenuId
  }

  get getTuesdayMenuId (): number {
    return this.tuesdayMenuId
  }

  get getWednesdayMenuId (): number {
    return this.wednesdayMenuId
  }

  get getThursdayMenuId (): number {
    return this.thursdayMenuId
  }

  get getFridayMenuId (): number {
    return this.fridayMenuId
  }

  get getSaturdayMenuId (): number {
    return this.saturdayMenuId
  }

  get getSundayMenuId (): number {
    return this.sundayMenuId
  }

  // eslint-disable-next-line class-methods-use-this
  protected verifyProperties (propName: verifyProp, value: number): void {
    // As all properties are id (numbers) will share same validation
    if (typeof value !== 'number') {
      throw new TypeError(invalidPropertyTypeErrorMessage(
        propName,
        value,
        'only number allowed'
      ))
    }
  }
}

type verifyProp =
'mondayMenuId'
| 'tuesdayMenuId'
| 'wednesdayMenuId'
| 'thursdayMenuId'
| 'fridayMenuId'
| 'saturdayMenuId'
| 'sundayMenuId'

export default WeeklyMenu
