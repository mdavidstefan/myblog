import React from 'react'
import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { sanitizeUrl } from '../utility/utils'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DoNotDisturb } from '@mui/icons-material';
import { ReadMore } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import KitchenSharpIcon from '@mui/icons-material/KitchenSharp';
import PsychologyAltSharpIcon from '@mui/icons-material/PsychologyAltSharp';
import LocalBarSharpIcon from '@mui/icons-material/LocalBarSharp';
import TerminalSharpIcon from '@mui/icons-material/TerminalSharp';

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
    //console.log(extractUrlAndId(user.photoURL).url);
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const categIcon =
    {
        "Konyha": <KitchenSharpIcon />,
        "Szórakozás": <LocalBarSharpIcon />,
        "Technológia": <TerminalSharpIcon />,
        "Filozófia": <PsychologyAltSharpIcon />,
    }

    const getcateg = () => {
        if (category == "Konyha") return categIcon.Konyha
        if (category == "Szórakozás") return categIcon.Szórakozás
        if (category == "Technológia") return categIcon.Technológia
        if (category == "Filozófia") return categIcon.Filozófia
    }
    const navigate = useNavigate()

    return (
        <div>
            <Card sx={{ maxWidth: 350, minWidth: 'auto' }}>
                <CardHeader
                    avatar={
                        getcateg() || <DoNotDisturb />
                    }
                    title={title}
                    subheader={author}
                />
                <CardMedia sx={{
                    objectFit: 'cover',
                    height: 350,
                    width: 'auto'
                }}
                    component="img"
                    image={photo.url}
                    alt={title}
                />
                <CardContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {sanitizeUrl(story)}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="share">
                        <ReadMore onClick={() => navigate("/readPost/" + id)} />
                    </IconButton>
                </CardActions>

            </Card>
        </div>
    )
}

