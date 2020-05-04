import { combineReducers } from 'redux'
import location from '../reducers/Location/Location'


export const application = combineReducers({
    
    locationData: location
})

export const initialState = {

    locationData: location({}, { type: "init " }),
}
 