import { createContext } from 'react';
import { Entry } from '../../interfaces';


interface ContextProps {
     entries: Entry[]

     // M√®todes
     afegirNovaEntrada: (description: string) => void;
     updateEntry: (entry: Entry, mostraNotificaci√≥?: boolean) => void;
     deleteEntry: (entry: Entry, mostraNotificaci√≥?: boolean) => void; 
     
}


export const EntriesContext = createContext({} as ContextProps)