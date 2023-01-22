import { ChangeEvent, useState, useContext } from 'react';

import { Button, Box, TextField } from '@mui/material'

import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { UIContext } from '../../context/ui';



export const NovaEntrada = () => {

    const { afegirNovaEntrada } = useContext(EntriesContext)
    const {isAddingEntry, setIsAddingEntry} = useContext(UIContext)
    
    const [inputValue, setInputValue] = useState('')
    const [touch, setTouch] = useState(false)

    const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setInputValue(event.target.value)
    }

    const onSave = () => {
        if( inputValue.length === 0 ) return
        afegirNovaEntrada(inputValue)
        setIsAddingEntry(false)
        setTouch(false)
        setInputValue('')
    }

    return (
        <Box sx={{ marginBottom: 2, paddingX: 2 }} >
            {
                isAddingEntry ? (
                    <>
                        <TextField
                            fullWidth
                            sx={{ marginTop: 2, marginBottom: 1 }}
                            placeholder='Nova entrada'
                            autoFocus
                            multiline
                            label='Nova entrada'
                            helperText= {inputValue.length <= 0 && touch && 'Ingressa un valor' }
                            error = { inputValue.length <= 0 && touch }
                            value = { inputValue }
                            onChange = { onTextFieldChanged }
                            onBlur = { () => setTouch(true)}
                        />
                        <Box display='flex' justifyContent='space-between'>
                            <Button
                                variant='outlined'
                                color='warning'
                                endIcon={<CancelOutlinedIcon />}
                                onClick= { () => setIsAddingEntry(false)}
                            >
                                Cancelar
                            </Button>
                            <Button
                                variant='outlined'
                                color='secondary'
                                endIcon={<SaveAsOutlinedIcon />}
                                onClick = { onSave }
                            >
                                Guardar
                            </Button>
                        </Box>
                    </>
                )
                    :
                    (
                        <Button
                            startIcon={<AddCircleOutlineOutlinedIcon />}
                            fullWidth
                            variant='outlined'
                            onClick = { () => setIsAddingEntry( true )}
                        >
                            Afegir Tasca
                        </Button>
                    )
            }
        </Box>
    )
}
