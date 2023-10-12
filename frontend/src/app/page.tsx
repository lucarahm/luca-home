import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import MediaCard from '../components/MediaCard';

export default function HomePage() {
    return (
            <div>
                <Alert severity="info" sx={{mt: 2, mb: 5}}>
                    <AlertTitle>Hello 👋</AlertTitle>
                    This app is currently being build.
                </Alert>

                <MediaCard
                    heading="Pass des Tages"
                    text="Wout van Aert: Dont listen to Jony"
                />
            </div>
    );
}
