import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { extractUrlAndId, sanitizeUrl } from '../utility/utils'


import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Agriculture } from '@mui/icons-material';
import { SoupKitchen } from '@mui/icons-material';
import { Celebration } from '@mui/icons-material';
import { ScreenSearchDesktop } from '@mui/icons-material';
import { DoNotDisturb } from '@mui/icons-material';
import { ReadMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme }) => ({
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
    variants: [
        {
            props: ({ expand }) => !expand,
            style: {
                transform: 'rotate(0deg)',
            },
        },
        {
            props: ({ expand }) => !!expand,
            style: {
                transform: 'rotate(180deg)',
            },
        },
    ],
}));

export const SingleCard = ({ author, category, photo, story, timestamp, title, userId, id }) => {

    const { user } = useContext(UserContext)
    //console.log(extraUrlAndId(user.photoURL).url);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const categIcon =
    {
        "Jármű": <Agriculture />,
        "Konyha": <SoupKitchen />,
        "Szórakozás": <Celebration />,
        "Technológia": <ScreenSearchDesktop />
    }

    const getcateg = () => {
        if (category == "Technológia") return categIcon.Jármű
        if (category == "Étel") return categIcon.Konyha
        if (category == "Konyha") return categIcon.Szórakozás
        if (category == "Szórakozás") return categIcon.Technológia
    }
    const navigate = useNavigate()

    return (
        <div>
            <Card sx={{ maxWidth: 345 }}>
                <CardHeader
                    avatar={
                        getcateg() || <DoNotDisturb />
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={title}
                    subheader={author}
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={photo.url}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {sanitizeUrl(story)}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ReadMore onClick={() => navigate("/readPost/" + id)} />
                    </IconButton>
                    <ExpandMore
                        expand={expanded}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ReadMore />
                    </ExpandMore>
                </CardActions>

            </Card>
        </div>
    )
}

