import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {useMutation, useQueryClient} from "@tanstack/react-query";

import ConnectionService from "../../../../../services/ConnectionService";
import {AppContext} from "../../../../../context/AppContext";


export function Component() {
    const queryClient = useQueryClient()
    const [loading, setLoading] = React.useState(false);
    const [connection, setConnection] = React.useState({name: "", url: ""});
    const { showSnackbarMessage } = React.useContext(AppContext)

    const connectionMutation = useMutation({
        mutationFn: async (connection) => {
            const { data, error } = await ConnectionService.create(connection)
            if (error) {
                throw error;
            }
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["connections"] });
        },
        onError(resp) {
            showSnackbarMessage(resp.response.data.message, "error")
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        const data = new FormData(event.currentTarget);
        connectionMutation.mutate(data)

    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper elevation={0} sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            marginTop: 8,
                            marginBottom: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography component="h1" variant="h5">
                            New Elasticsearch connection
                        </Typography>
                        <Box component="form"  onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <TextField
                                value={connection.name}
                                label="Connection name"
                                color="secondary"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                name="name"
                                onChange={e => setConnection({...connection, name: e.target.value})}
                            />
                            <TextField
                                value={connection.url}
                                label="URL"
                                color="secondary"
                                size="small"
                                margin="normal"
                                required
                                fullWidth
                                name="url"
                                onChange={e => setConnection({...connection, url: e.target.value})}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                loading={loading ? 1 : 0}
                            >
                                Add connection
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    )
}
