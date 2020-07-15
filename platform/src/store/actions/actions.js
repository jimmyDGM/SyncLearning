import { SET_PROJECT } from './actionTypes'

export const setProject = content => {
  return({
  type: SET_PROJECT,
  payload: {
    id: content._id,
    name: content.name
  }
})}