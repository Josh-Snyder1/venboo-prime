// Imports
import { useState } from "react";
import { useSelector } from "react-redux";
import { Card, Grid, Stack, Button } from "@mui/material";
import { useHistory } from "react-router-dom";
import moment from "moment";

// Exported Function Component
function EventListHost() {
    // Stores
    const user = useSelector((store) => store.user);
    const allEvents = useSelector((store) => store.events);

    // Local state
    const [viewList, setViewList] = useState('upcoming');

    // Vars
    const todayDate = moment().format('YYYYMMDD');
    const history = useHistory();

    console.log(allEvents)
    // Render
    return (
        <Grid 
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
                marginBottom: '1em',
                padding: "1em"
            }}
            >
                {allEvents.length === 0 &&
                    <>
                        <h3>Welcome!</h3>
                        <h3>Looks like you don't have any events, let's create one!</h3>
                        <Button
                            variant="contained"
                            onClick={() => history.push('/addEventForm')}
                        >
                            New Event
                        </Button>
                    </>
                }
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginTop: '2em'
                    }}
                >
                    <Button onClick={() => setViewList('')}>Upcoming</Button>
                    <Button onClick={() => setViewList('pending')}>Pending Verification</Button>
                    <Button onClick={() => setViewList('past')}>Past</Button>
                </Stack>
                <Stack
                    direction="column"
                    justifyContent="space-evenly"
                    alignItems="center"
                    spacing={1}
                    sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        marginTop: '1em'
                    }}
                >
                {allEvents.map((itemEvent) => {
                    if (
                        itemEvent.user_id === user.id
                        &&
                        viewList === 'upcoming'
                        &&
                        Number(moment(itemEvent.start_date).format('YYYYMMDD')) >= Number(todayDate)
                        &&
                        itemEvent.verified
                    ){
                        return (
                            <Card
                                onClick={() => history.push(`/event/${itemEvent.id}`)}
                                key={itemEvent.id}
                                elevation={4}
                                sx={{
                                    padding: "1em"
                                }}
                            >
                                <h4>{itemEvent.name}</h4>
                                <ul>
                                    <li>{moment(itemEvent.start_date).format('MMM DD YYYY')} - {moment(itemEvent.end_date).format('MMM DD YYYY')}</li>
                                    <li>{itemEvent.description}</li>
                                    <li>Status: Verified ✅</li>
                                </ul>
                            </Card>
                        )
                    }
                    else if (
                        itemEvent.user_id === user.id
                        &&
                        viewList === 'pending'
                        &&
                        Number(moment(itemEvent.start_date).format('YYYYMMDD')) >= Number(todayDate)
                        &&
                        !itemEvent.verified
                    ){
                        return (
                            <Card
                                onClick={() => history.push(`/event/${itemEvent.id}`)}
                                key={itemEvent.id}
                                elevation={4}
                                sx={{
                                    padding: "1em"
                                }}
                            >
                                <h4>{itemEvent.name}</h4>
                                <ul>
                                    <li>{moment(itemEvent.start_date).format('MMM DD YYYY')} - {moment(itemEvent.end_date).format('MMM DD YYYY')}</li>
                                    <li>{itemEvent.description}</li>
                                    <li>Status: Pending ❌</li>
                                </ul>
                            </Card>
                        )
                    }
                    else if (
                        itemEvent.user_id === user.id
                        &&
                        viewList === 'past'
                        &&
                        Number(moment(itemEvent.start_date).format('YYYYMMDD')) < Number(todayDate)
                    ){
                        return (
                            <Card
                                onClick={() => history.push(`/event/${itemEvent.id}`)}
                                key={itemEvent.id}
                                elevation={4}
                                sx={{
                                    padding: "1em"
                                }}
                            >
                                <h4>{itemEvent.name}</h4>
                                <ul>
                                    <li>{moment(itemEvent.start_date).format('MMM DD YYYY')} - {moment(itemEvent.end_date).format('MMM DD YYYY')}</li>
                                    <li>{itemEvent.description}</li>
                                    {itemEvent.verified}
                                </ul>
                            </Card>
                        )
                    }
                })}
                </Stack>
            </Grid>
    )
}
export default EventListHost;