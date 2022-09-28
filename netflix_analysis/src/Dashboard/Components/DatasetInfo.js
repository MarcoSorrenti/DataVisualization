import React from 'react';

import Typography from '@mui/material/Typography';


class DatasetInfo extends React.Component {

    render() {
        const data = this.props.data ? this.props.data : []
        
        const count = data
            .filter(d => this.props.type ? d.type === this.props.type : true)
            .filter(d => this.props.category ? d.listed_in.includes(this.props.category) : true)
            .length

        return (
            <React.Fragment>

                <Typography variant="body1">
                    Total records: {count} 
                </Typography>

            </React.Fragment>
        );
    }
}

export default DatasetInfo;