import { SET_PROJECT } from './actionTypes'

let nextTodoId = 0
export const setProject = content => ({
  type: SET_PROJECT,
  payload: {
    id: content._id,
    name: content.name
  }
})