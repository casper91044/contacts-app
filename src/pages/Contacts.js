import React from 'react'
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {ContactsTable} from "./ContactsTable";
import Box from "@material-ui/core/Box";
import {ContactsViewMode, DATA_VIEW_MODES} from "./ContactsViewMode";
import {useDataViewMode} from "./useDataViewMode";
import {useContacts} from "./useContacts";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: theme.spacing(4)
        },
        headContainer: {
            marginBottom: theme.spacing(3)
        }
    })
);

export const Contacts = () => {
    const classes = useStyles();
    const contacts = useContacts();
    const[dataViewMode, setDataViewMode] = useDataViewMode();

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.headContainer}>
                    <Box display='flex' justifyContent='space-between'>
                        <Typography variant='h4' component='h1'>Contacts</Typography>
                        <ContactsViewMode dataViewMode={dataViewMode}
                                          setDataViewMode={setDataViewMode}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (contacts.isLoading) {
                            return <div>...loading</div>
                        }

                        if (contacts.isError) {
                            return <div>...error</div>
                        }
                        if (dataViewMode === DATA_VIEW_MODES.TABLE) {
                            return <ContactsTable data={contacts.data}/>
                        }
                        if (dataViewMode === DATA_VIEW_MODES.GRID) {
                            return 'grid'
                        }
                        return null
                    })()}
                </Grid>
            </Grid>
        </Container>
    )
};
