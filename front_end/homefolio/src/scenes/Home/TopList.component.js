import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import DataService from '../../services/data.service';

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
    },
    table: {
        minWidth: 1020,
    }
});

/*
const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
});*/

class TopList extends React.Component {
    constructor(props) {
        super(props);
        this.service = new DataService();
    }




    /*
    EnhancedTableToolbar = props => {
        const { classes } = props;

        return (
            <Toolbar
                className={classNames(classes.root, {
                    [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography color="inherit" variant="subheading">
                            {numSelected} selected
            </Typography>
                    ) : (
                            <Typography variant="title">Nutrition</Typography>
                        )}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton aria-label="Delete">
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    ) : (
                            <Tooltip title="Filter list">
                                <IconButton aria-label="Filter list">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip>
                        )}
                </div>
            </Toolbar>
        );
    };
*/




    render() {
        const { classes } = this.props;

        let id = 0;
        function createData(name, calories, fat, q) {
            id += 1;
            return { id, name, calories, fat, q };
        }

        const data = [
            createData('Frozen yoghurt', 159, 6.0, 5),
            createData('Ice cream sandwich', 237, 9.0, 3),
            createData('Eclair', 262, 16.0, 7),
            createData('Cupcake', 305, 3.7, 9),
            createData('Gingerbread', 356, 16.0, 10),
        ];

        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell numeric>Likes</TableCell>
                            <TableCell numeric>Viewed</TableCell>
                            <TableCell numeric>Building Quality</TableCell>
                            <TableCell numeric>Price</TableCell>
                            <TableCell numeric>Tax</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map(n => {
                            return (
                                <TableRow key={n.id}>
                                    <TableCell>{n.name}</TableCell>
                                    <TableCell numeric>{n.calories}</TableCell>
                                    <TableCell numeric>{n.fat}</TableCell>
                                    <TableCell numeric>{n.q}</TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Paper>
        )
    }
}

TopList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TopList);
