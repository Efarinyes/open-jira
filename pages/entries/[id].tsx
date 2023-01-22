import { ChangeEvent, FC, useMemo, useState, useContext } from 'react';
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router';

import {
    Button, capitalize, Card,
    CardActions, CardContent,
    CardHeader, FormControl,
    FormControlLabel, FormLabel,
    Grid, IconButton, Radio,
    RadioGroup, TextField
} from "@mui/material"

import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { Layout } from "../../components/layouts"
import { Entry, EntryStatus } from "../../interfaces";
import { dbEntries } from '../../database';
import { EntriesContext } from '../../context/entries';
import { dateFunctions } from '../../utils';



const estatsValids: EntryStatus[] = ['pendent', 'en-progres', 'finalitzat']

interface Props {
    entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {

    const router = useRouter()
    const { updateEntry, deleteEntry } = useContext(EntriesContext)

    const [inputValue, setInputValue] = useState(entry.description)
    const [status, setStatus] = useState<EntryStatus>(entry.status)
    const [touch, setTouch] = useState(false)

    const notValid = useMemo(() => inputValue.length <= 0 && touch, [inputValue, touch])

    const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }

    const onStatusChanged = (event: ChangeEvent<HTMLInputElement>) => {
        setStatus(event.target.value as EntryStatus)
    }
    const onSave = () => {
        if (inputValue.trim().length === 0) return
        const updatedEntry: Entry = {
            ...entry,
            status,
            description: inputValue
        }
        updateEntry(updatedEntry, true)
    }

    const onDelete = () => {    ///// esto modificado
        deleteEntry( entry, true );
        router.push('/')
    }
   

    return (
        <Layout title={inputValue.substring(0, 10) + '...'}>
            <Grid
                container
                justifyContent='center'
                sx={{ marginTop: 2 }}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`Entrada:`}
                            subheader={` ${ dateFunctions.getFormatDistanceToNow(entry.createdAt)}`}
                        />
                        <CardContent>
                            <TextField
                                sx={{ marginTop: 2, marginBottom: 1 }}
                                fullWidth
                                placeholder="Nova Entrada"
                                autoFocus
                                multiline
                                label='Nova Entrada'
                                value={inputValue}
                                onChange={onInputValueChanged}
                                onBlur={() => setTouch(true)}
                                error={notValid}
                                helperText={notValid && 'Has de posar uns descripció'}

                            />
                            <FormControl>
                                <FormLabel>Estat:</FormLabel>
                                <RadioGroup
                                    row
                                    value={status}
                                    onChange={onStatusChanged}
                                >
                                    {
                                        estatsValids.map(opcio => (
                                            <FormControlLabel
                                                key={opcio}
                                                value={opcio}
                                                control={<Radio />}
                                                label={capitalize(opcio)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveOutlinedIcon />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={inputValue.length <= 0}
                            >
                                Guarda
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton
                onClick={ onDelete }
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }} >
                <DeleteOutlinedIcon />
            </IconButton>
        </Layout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { id } = params as { id: string }

    const entry = await dbEntries.getEntryById(id)

    if (!entry) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            entry
        }
    }
}

export default EntryPage
