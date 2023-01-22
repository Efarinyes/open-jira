import { FC, useEffect, useReducer } from 'react'

import { useSnackbar } from 'notistack';
import { entriesApi } from '../../apis';

import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
    entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
    entries: []
}
interface Props {
   children: JSX.Element | JSX.Element[]
}

export const EntriesProvider: FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE);
    const { enqueueSnackbar } = useSnackbar();

    const afegirNovaEntrada =async (description: string) => {
        const {data } = await entriesApi.post<Entry>('/entries', { description })
        
        dispatch({ type: '[Entry] Add-Entry', payload: data})
    }
    
    const updateEntry = async ( {_id, description, status }: Entry, mostraNotificació = false) => {

         try {
            const {data } = await entriesApi.put<Entry>(`/entries/${_id}`, { description, status })
            dispatch({ type: '[Entry] Entry-Updated', payload: data})

            // TODO: Mostrar retoralimentació d'actualització d'entrada (SnackBar)
            if(mostraNotificació) 
                enqueueSnackbar('Entrada actualitzada',{
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical:'top',
                        horizontal: 'right'
                    }
            })
         } catch (error) {
            console.log({error})
         } 
    }

    const  deleteEntry = async (entry: Entry, mostraNotificacio = false) => {
        try {
            const { data } = await entriesApi.delete<Entry>(`entries/${entry._id}`)
            dispatch({
                type: '[Entry] - Entry-Deleted',
                payload: data
            })
            if(mostraNotificacio) 
                enqueueSnackbar('Entrada Borrada correctament',{
                    variant: 'success',
                    autoHideDuration: 1500,
                    anchorOrigin: {
                        vertical:'top',
                        horizontal: 'right'
                    }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const refrescaEntradas = async () => {
        const {data} = await entriesApi.get<Entry[]>('/entries')
        dispatch({ type: '[Entry] Refresca-Entradas', payload: data })
    }
 
    useEffect(() => {
        refrescaEntradas()
    }, [])

  return (
    <EntriesContext.Provider value= {{
        ...state,

        // Mètodes
        afegirNovaEntrada,
        updateEntry,
        deleteEntry
        
    }}>
        { children }

    </EntriesContext.Provider>
  )
}