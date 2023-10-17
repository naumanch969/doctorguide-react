 

import React, { useState } from 'react'
import { Snackbar, IconButton, Button } from '@mui/material';
import { Close } from '@mui/icons-material';

export default function SnackbarComponent({ open, setOpen, note }: { open: boolean, setOpen: any, note: string }) {

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                {/* UNDO */}
            </Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
            >
                <Close fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={note}
                action={action}
            />
        </div>
    );
}