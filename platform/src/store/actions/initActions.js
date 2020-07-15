import { INIT_PROJECT } from './actionTypes'

export const initProject = content => ({
  type: INIT_PROJECT,
  payload: {
    id: content._id,
    name: content.name
  }
})