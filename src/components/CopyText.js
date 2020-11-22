import React, {useCallback, useState} from "react";
import {useCopyToClipboard} from "react-use"
import * as PropTypes from "prop-types";
import FileCopyOutlinedIcon from "@material-ui/icons/FileCopyOutlined"
import {makeStyles} from "@material-ui/core/styles";
import {createStyles} from "@material-ui/styles";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            cursor: 'pointer'
        },
        icon: {
            marginRight: theme.spacing(1),
            color: 'blue'
        }
    })
);

const STATUS_COPY = {
    COPY: 'copy',
    COPIED: 'copied'
}

export const CopyText = ({text}) => {
    const classes = useStyles();
    const [, copyToClipboard] = useCopyToClipboard();
    const[statusCopy, setStatusCopy] = useState(STATUS_COPY.COPY);

    const getTooltipTitle = () => {
        switch (statusCopy) {
            case STATUS_COPY.COPY:
                return 'Copy';
            case STATUS_COPY.COPIED:
                return 'Copied';
            default:
                return '';
        }
    };

    const onClickCopy = useCallback(() => {
        copyToClipboard(text);
        setStatusCopy(STATUS_COPY.COPIED);
    }, [copyToClipboard, text]);

    const onClickAway = useCallback(() => {
        setStatusCopy(STATUS_COPY.COPY);
    },[setStatusCopy])

    return (
        <ClickAwayListener onClickAway={onClickAway}>
            <Tooltip title={getTooltipTitle()} placement='top' arrow>
                <Box display='flex'
                     alignItems='center'
                     className={classes.root}
                     onClick={onClickCopy}
                >
                    <FileCopyOutlinedIcon fontSize="small" className={classes.icon}/>
                    {text}
                </Box>
            </Tooltip>
        </ClickAwayListener>
    )
}

CopyText.propTypes = {
    text: PropTypes.string.isRequired
}