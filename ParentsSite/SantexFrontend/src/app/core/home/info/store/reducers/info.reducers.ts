import { InfoModel } from '../../../src/InfoModel';
import * as Actions from '../info.actions';

export interface State{
    infos: InfoModel[];
}

const initialState: State = {
    infos: []
}

export function reducer(state: State = initialState, action: Actions.InfoActions): State{
    switch (action.type){
        case Actions.SHOW_INFO:
        case Actions.SHOW_WARNING:
        case Actions.SHOW_ERROR:
            let newInfo = {...<InfoModel>action.payload};
            let infos = [...state.infos, {...newInfo}];
            let newState = {...state, infos: [...infos]};
            return {
                ...newState
            };
        case Actions.DELETE_INFO:
            const index = <number>action.payload;
            const oldInfos = [...state.infos];
            oldInfos.splice(index, 1);
            return {
                ...state,
                infos: oldInfos
            }
        default:
            return state;
    }
}

export const getInfos = (state: State) => state.infos;