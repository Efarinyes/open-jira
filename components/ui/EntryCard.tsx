import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { DragEvent, FC, useContext } from "react"
import { UIContext } from "../../context/ui"
import { Entry } from "../../interfaces"
import { dateFunctions } from "../../utils"



interface Props {
    entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {

    const {startDragging, endDragging} = useContext(UIContext)
    const router = useRouter()

    const onDragStart = ( event: DragEvent<HTMLDivElement> ) => {
        
        event.dataTransfer.setData('contingut', entry._id)
        startDragging()
        
    }
    const onDragEnd = () => {
        endDragging()
    }
    const clicat = () => {
        router.push(`/entries/${entry._id}`)
    }

    return (
        <Card
            onClick={ clicat }
            sx={{ marginBottom: 1 }}
            // funcionalitat del DragDrop
            draggable
            onDragStart={ onDragStart }
            onDragEnd = { onDragEnd }
        >
            <CardActionArea>
                <CardContent>
                    <Typography sx={{ whiteSpace: 'pre-line' }}> {entry.description} </Typography>
                </CardContent>
                <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 1 }}>
                    <Typography variant="body2" >{ dateFunctions.getFormatDistanceToNow(entry.createdAt)} </Typography>
                </CardActions>
            </CardActionArea>

        </Card>
    )
}
