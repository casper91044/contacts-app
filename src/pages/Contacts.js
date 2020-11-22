import React, {useEffect, useState} from 'react'
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {ContactsTable} from "./ContactsTable";

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

export const useContacts = () => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getContacts = async () => {
            try {
                setIsLoading(true)
                const response = await fetch('https://randomuser.me/api/?results=100');
                const {results, error} = await response.json();
                if (error) {
                    throw new Error(error)
                }
                setData(results);
                setIsError(false);
            } catch (e) {
                setIsError(true);
            } finally {
                setIsLoading(false);
            }
        };
        getContacts();
    }, [])

    return {
        data,
        isLoading,
        isError
    }
}

export const Contacts = () => {
    const classes = useStyles();
    const contacts = useContacts();

    return (
        <Container className={classes.root}>
            <Grid container>
                <Grid item xs={12} className={classes.headContainer}>
                    <Typography variant='h4' component='h1'>Contacts</Typography>
                </Grid>
                <Grid item xs={12}>
                    {(() => {
                        if (contacts.isLoading) {
                            return <div>...loading</div>
                        }

                        if (contacts.isError) {
                            return <div>...error</div>
                        }
                        return <ContactsTable data={contacts.data}/>
                    })()}
                </Grid>
            </Grid>
        </Container>
    )
};