import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import PropTypes from 'prop-types'
import React, {useCallback} from "react";

export const DATA_VIEW_MODES = {
    TABLE: 'table',
    GRID: 'grid'
};

export const ContactsViewMode = ({dataViewMode, setDataViewMode}) => {

    const handleChangeDataViewMode = useCallback((_, nextView) => {
        setDataViewMode(nextView);
    }, [setDataViewMode]);

    return <ToggleButtonGroup value={dataViewMode}
                              exclusive
                              onChange={handleChangeDataViewMode}>
        <ToggleButton value={DATA_VIEW_MODES.GRID}
                      aria-label={DATA_VIEW_MODES.GRID}>
            <ViewModuleIcon/>
        </ToggleButton>
        <ToggleButton value={DATA_VIEW_MODES.TABLE}
                      aria-label={DATA_VIEW_MODES.TABLE}>
            <ViewListIcon/>
        </ToggleButton>
    </ToggleButtonGroup>
};

ContactsViewMode.propTypes = {
    dataViewMode: PropTypes.oneOf([DATA_VIEW_MODES.TABLE, DATA_VIEW_MODES.GRID]).isRequired,
    setDataViewMode: PropTypes.func.isRequired
};
