import { createContext } from 'react';
import { Entry } from '../../interfaces';


interface ContextProps {
     entries: Entry[]

     // Mètodes
     afegirNovaEntrada: (description: string) => void;
     updateEntry: (entry: Entry, mostraNotificació?: boolean) => void;
     deleteEntry: (entry: Entry, mostraNotificació?: boolean) => void; 
     
}


export const EntriesContext = createContext({} as ContextProps)