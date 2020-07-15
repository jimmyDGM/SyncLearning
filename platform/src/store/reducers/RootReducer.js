import {ServerUrl} from '../../config.js'

const initState =  {
  currentProject: '',
  level:2,
  baseApi: ServerUrl
}

const RootReducer = (state = initState, action) => {

    switch (action.type) {
      case 'SET_PROJECT':
        return {
          ...state,
          currentProject: action.payload.id
        }
      default: 

        return state

   }
}

export default RootReducer;