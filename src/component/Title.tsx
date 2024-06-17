import * as React from 'react';
import { Typography } from "@mui/material";
import routes from '../helpers/routes';
import library from '../helpers/library';
import { useHistory } from 'react-router-dom';

const Title: React.FunctionComponent = () => {

    const history = useHistory();
    
    const goToPage = (path: any) => {
        history.push(path);
    };

    return (
        <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => goToPage(routes.home)}
            sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
            }}
        >
            {library.title}
        </Typography>
    );
}

export default Title;