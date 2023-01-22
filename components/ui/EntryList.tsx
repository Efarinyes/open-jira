import { DragEvent, FC, useContext, useMemo } from "react"
import { List, Paper } from "@mui/material"
import { EntryStatus } from "../../interfaces"
import { EntryCard } from "./"
import { EntriesContext } from '../../context/entries';
import { UIContext } from "../../context/ui";
import styles from './EntryList.module.css';


interface Props {
    status: EntryStatus
}

export const EntryList: FC<Props> = ({status}) => {
    const { entries, updateEntry } = useContext(EntriesContext)
    const {isDragging, endDragging } = useContext(UIContext)

    const entriesByStatus = useMemo( () =>  entries.filter( entry => entry.status === status) ,[entries, status] )

    const allowDrop = (event: DragEvent<HTMLDivElement>) => {
      event.preventDefault()
    }
    const onDropEntry = (event: DragEvent<HTMLDivElement>) => {
      const id = event.dataTransfer.getData('contingut');
      const entry = entries.find(e => e._id === id )!;
      entry.status = status;
      updateEntry(entry);
      endDragging();
    }
  return (
    <div 
      onDrop={ onDropEntry }
      onDragOver= { allowDrop }
      className = { isDragging ? styles.dragging : '' }
    >
        <Paper
            // sx={{  height: 'calc(100vh - 250px)',backgroundColor: 'red', padding: '3px 5px'}}
            sx={{
                height: "calc(100vh - 180px)",
                overflowY: "auto",
                padding: '1px 3px',
                backgroundColor: 'transparent',
                "&::-webkit-scrollbar": {
                  width: "2px",
                  bgcolor: "#4a148c",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#4a148c",
                  border: "7px none #fffff",
                  borderRadius: "10px",
                },
              }}
        >
            <List sx={{ 
                opacity: isDragging ? 0.3 : 1,
                transition: 'all, 0.3s'
             }}
            >    
                {
                    entriesByStatus.map( entry => (
                        <EntryCard key = { entry._id } entry = { entry } />
                    ))
                }
                
            </List>
        </Paper>
    </div>
  )
}
