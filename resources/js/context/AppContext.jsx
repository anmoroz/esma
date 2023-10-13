import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";


export const AppContext = React.createContext(null)

export function AppContextProvider({ children }) {
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [messageSnackbar, setMessageSnackbar] = React.useState("")
    const [severity, setSeverity] = React.useState("info")

    const showSnackbarMessage = React.useCallback((message, severity) => {
        setMessageSnackbar(message)
        setSeverity(severity)
        setOpenSnackbar(true)
    }, [])

    const [openConfirmDialog, setOpenConfirmDialog] = React.useState(false);
    const [textConfirmDialog, setTextConfirmDialog] = React.useState("")
    const [confirmCallback, setConfirmCallback] = React.useState(() => {})

    const showConfirmDialog = React.useCallback((text, callback) => {
        setTextConfirmDialog(text)
        setConfirmCallback(() => callback)
        setOpenConfirmDialog(true)
    }, [])

    const value = React.useMemo(() => {
        return {
            showSnackbarMessage,
            showConfirmDialog
        }
    }, [
        showSnackbarMessage,
        showConfirmDialog
    ])

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSnackbar(false)
    };

    const handleCloseConfirmDialog = () => {
        setOpenConfirmDialog(false);
    };

    const handleConfirm = () => {
        setOpenConfirmDialog(false);
        confirmCallback();
    };

    return (
        <AppContext.Provider value={value}>
            {children}
            <Dialog
                fullScreen={false}
                open={openConfirmDialog}
                onClose={handleCloseConfirmDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title"></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {textConfirmDialog}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseConfirmDialog}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={ severity } sx={{ width: '100%' }}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>
        </AppContext.Provider>
    )
}
