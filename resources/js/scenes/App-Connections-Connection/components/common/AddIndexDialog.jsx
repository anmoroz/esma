import * as React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import ElasticsearchService from "../../../../services/ElasticsearchService";
import {AppContext} from "../../../../context/AppContext";

const AddIndexDialog = (props) => {
    const [name, setName] = React.useState('');
    const queryClient = useQueryClient()
    const elasticsearchService = ElasticsearchService

    const { showSnackbarMessage } = React.useContext(AppContext)

    const {mutate} = useMutation(
        ['create index'],
        (name) => elasticsearchService.createIndex(props.connectionId, {name: name}),
        {
            onSuccess() {
                setName("")
                queryClient.invalidateQueries({ queryKey: ["connection", params.connectionId, "indices"] })
                showSnackbarMessage("Index successfully created", "success")
                props.addIndexCloseDialogHandler()
            },
            onError(resp) {
                showSnackbarMessage(resp.message, "error")
            }
        }
    )

    const submitHandler = (e) => {
        e.preventDefault();
        mutate(name)
    }

    return (
        <div>
            <Dialog open={props.openAddIndexDialog} onClose={props.addIndexCloseDialogHandler}>
                <form onSubmit={submitHandler}>
                    <DialogTitle>Creates a new Elasticsearch index</DialogTitle>
                    <DialogContent>
                        <DialogContentText></DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Index name"
                            fullWidth
                            variant="standard"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.addIndexCloseDialogHandler}>Cancel</Button>
                        <Button type="submit">Ok</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}

export default AddIndexDialog
