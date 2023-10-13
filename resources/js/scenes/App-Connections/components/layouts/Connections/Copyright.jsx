import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import classes from "./Connections.module.css";

const Copyright = (props) => {
    return (
        <div className={classes.copyright}>
            <Typography variant="body2" color="text.secondary" align="center" {...props}>
                {'Copyright © '}
                <Link color="inherit" href="https://github.com/anmoroz">
                    ESMA - Elasticsearch management application
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
            </Typography>
        </div>
    );
};

export default Copyright;
