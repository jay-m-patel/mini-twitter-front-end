import React from 'react'
import { get as _get } from 'lodash'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import InlineEditor from '@ckeditor/ckeditor5-build-inline'
import { Box, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    regBox: {
        border: '1px solid rgba(144, 144, 144, 0.5)'
    },
    errBox: {
        border: '1px solid rgba(255, 0, 0, 0.5)'
    }
}))

export default function Editor({data, onChange, onFocus, err, errMessage, ...props}) {
    const classes = useStyles()
    return (
        <Box className={!err ? classes.regBox : classes.errBox}>
            <CKEditor 
                editor={InlineEditor}
                data={data}
                onChange={onChange}
                onFocus={onFocus}
                {...props}
            />
            {errMessage && <Typography color="error">{errMessage}</Typography>}
        </Box>
    )
}
