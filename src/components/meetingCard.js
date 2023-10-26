import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Card, Stack, CardHeader, CardContent, IconButton, Divider, CardActionArea } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import TimelapseIcon from '@mui/icons-material/Timelapse';
import VideocamIcon from '@mui/icons-material/Videocam';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

import Colours from '../colours';

export default function MeetingCard(props) {
    const navigate = useNavigate();

    const meetingData = props.data
    const participant_list = meetingData.participant_list.join(', ')

    const handleRedirectToMeeting = () => {
        navigate(`/meeting/${meetingData.meeting_name}`)
    }

    return (
        <Card sx={{ borderRadius: 2 }}>
            <CardActionArea
                component="button"
                onClick={handleRedirectToMeeting}
                sx={{ p: 0 }}
            >
                <CardHeader
                    title={
                        <div style={{ display: 'flex', alignItems: "center" }}>
                            <VideocamIcon sx={{ mr: 1 }} />
                            <Typography component="h3" variant="h5" fontWeight="bold">{meetingData.meeting_name}</Typography>
                        </div>
                    }
                    action={
                        <IconButton>
                            <ArrowOutwardIcon sx={{ color: Colours.primaryOrange }} />
                        </IconButton>
                    }
                />
                <Divider sx={{ mb: 2 }} />
                <CardContent sx={{ py: 1 }}>
                    <Typography variant="body2" color="textSecondary" component="div">
                        <div style={{ display: 'flex', alignItems: "center" }}>
                            <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography>Hosted by {meetingData.host}</Typography>
                        </div>
                    </Typography>
                </CardContent>
                <CardContent sx={{ py: 1 }}>
                    <Typography variant="body2" color="textSecondary" component="div">
                        <div style={{ display: 'flex' }}>
                            <GroupIcon fontSize="small" sx={{ mr: 1, mt: 0.2 }} />
                            <Stack direction="row" alignItems="center" sx={{ minWidth: 0, mr: { md: 15 } }}>
                                <Typography>{participant_list}</Typography>
                            </Stack>
                        </div>
                    </Typography>
                </CardContent>
                <CardContent sx={{ my: 1 }}>
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={{ xs: 1, sm: 6 }}
                    >
                        <div style={{ display: 'flex', alignItems: "center" }}>
                            <EventIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="textSecondary">
                                {meetingData.date}
                            </Typography>
                        </div>
                        <div style={{ display: 'flex', alignItems: "center" }}>
                            <AccessTimeIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="textSecondary">
                                {meetingData.time}
                            </Typography>
                        </div>

                        <div style={{ display: 'flex', alignItems: "center" }}>
                            <TimelapseIcon fontSize="small" sx={{ mr: 1 }} />
                            <Typography variant="body2" color="textSecondary">
                                {Math.round(meetingData.duration)} min
                            </Typography>
                        </div>
                    </Stack>
                </CardContent>
            </CardActionArea>
        </Card>

    )
}