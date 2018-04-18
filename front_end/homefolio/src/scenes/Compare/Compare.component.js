import React from 'react';
import PropTypes from 'prop-types';
import HouseService from '../../services/house.service';
import NavBar from '../../components/NavBar/NavBar.component';
import { Link } from 'react-router-dom';
import { SortingState, EditingState, PagingState, IntegratedPaging, IntegratedSorting } from '@devexpress/dx-react-grid';
import { Grid, Table, TableHeaderRow, TableEditColumn, PagingPanel, DragDropProvider, TableColumnReordering } from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import Dialog, { DialogActions, DialogContent, DialogContentText, DialogTitle } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    dialog: {
        width: 'calc(100% - 16px)',
    },
    inputRoot: {
        width: '100%',
    },
});

const BackButton = () => (
    <Button component={Link} to="/home" color="secondary" >
        Redo
    </Button>
);
  
const DeleteButton = ({ onExecute }) => (
    <IconButton onClick={onExecute} title="Delete row">
        <DeleteIcon />
    </IconButton>
);
  
const commandComponents = {
    delete: DeleteButton,
};
  
const Command = ({ id, onExecute }) => {
    const CommandButton = commandComponents[id];
    return (
      <CommandButton onExecute={onExecute} />
    );
};
  
const Cell = (props) => {
    return <Table.Cell {...props} />;
};
  
const getRowId = row => row.id;

class Compare extends React.Component {
    constructor(props) {
        super(props);
        this.service = new HouseService();
        this.state = {
            columns: [
                { name: 'address', title: 'Address' },
                { name: 'bedroom', title: 'Number of Bedroom' },
                { name: 'bathroom', title: 'Number of Bathroom' },
                { name: 'story', title: 'Number of Stories' },
                { name: 'area', title: 'Building Area' },
                { name: 'lot', title: 'Lot Size' },
                { name: 'quality', title: 'Building Quality' },
                { name: 'year', title: 'Built Year' },
                { name: 'price', title: 'Sale Price' },
                { name: 'tax', title: 'Tax' }
            ],
            rows:[{
                address: '',
                bedroom: 3,
                bathroom: 2,
                story: 2,
                area: 125,
                lot: 50,
                quality: 7,
                year: 1993,
                price: 5000,
                tax: 300
            }],
            sorting: [],
            rowChanges: {},
            currentPage: 0,
            deletingRows: [],
            pageSize: 0,
            pageSizes: [5, 10, 0],
            columnOrder: ['address', 'bedroom', 'bathroom', 'story', 'area', 'lot', 'quality', 'year', 'price', 'tax'],
        };
    
        this.changeSorting = sorting => this.setState({ sorting });
        this.changeRowChanges = rowChanges => this.setState({ rowChanges });
        this.changeCurrentPage = currentPage => this.setState({ currentPage });
        this.changePageSize = pageSize => this.setState({ pageSize });
        this.commitChanges = ({ deleted }) => {
            let { rows } = this.state;
            this.setState({ rows, deletingRows: deleted || this.state.deletingRows });
        }; 
        this.cancelDelete = () => this.setState({ deletingRows: [] });
        this.deleteRows = () => {
            const rows = this.state.rows.slice();
            this.state.deletingRows.forEach((rowId) => {
                const index = rows.findIndex(row => row.id === rowId);
                if (index > -1)
                    rows.splice(index, 1);
            });
            this.setState({ rows, deletingRows: [] });
        };
        this.changeColumnOrder = (order) => {
            this.setState({ columnOrder: order });
        };
    }

    componentDidMount() {
        this.toRows(this.parseUrlToHouses()).then((result) => this.setState({ rows: result }));
    }

    parseUrlToHouses = () => {
        var queryParam = this.props.location.search.substring(8);
        var houses = []

        if (queryParam.length === 0)
            return houses;

        var index = queryParam.search(',');
        var temp;
        while(index !== -1) {
            temp = queryParam.substring(0, index);
            houses.push(temp);
            queryParam = queryParam.substring(index + 1);
            index = queryParam.search(',');
        }
        houses.push(queryParam);

        return houses;
    }

    toRows = async (houses) => {
        var rows = [];

        for(var index in houses) {
            var row;
            var info;
            await this.service.fetchHouseInfo(houses[index]).then((data) => {
                info = data;
                row = {
                    address: '',
                    bedroom: data.bedroomCnt,
                    bathroom: data.bathroomCnt,
                    story: data.storyNum,
                    area: data.livingAreaSize,
                    lot: data.lotSize,
                    quality: data.buildingQualityID,
                    year: data.yearBuilt,
                    price: data.price,
                    tax: data.tax
                };
            }); 
            await this.service.getHouseAddress(info.latitude, info.longitude).then((result) => row.address = result);
            rows.push(row);
        }

        return rows;
    }

    render() {
        const { classes } = this.props;
        const {
            rows,
            columns,
            tableColumnExtensions,
            sorting,
            rowChanges,
            currentPage,
            deletingRows,
            pageSize,
            pageSizes,
            columnOrder,
        } = this.state;
      
        return (
            <div>
                <NavBar />
                <Paper>
                    <Grid rows={rows} columns={columns} getRowId={getRowId} >
                        <SortingState sorting={sorting} onSortingChange={this.changeSorting} />
                        <PagingState
                            currentPage={currentPage}
                            onCurrentPageChange={this.changeCurrentPage}
                            pageSize={pageSize}
                            onPageSizeChange={this.changePageSize}
                        />
                        <IntegratedSorting />
                        <IntegratedPaging />
                        <EditingState
                            rowChanges={rowChanges}
                            onRowChangesChange={this.changeRowChanges}
                            onCommitChanges={this.commitChanges}
                        />
                        <DragDropProvider />
                        <BackButton />
                        <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />
                        <TableColumnReordering order={columnOrder} onOrderChange={this.changeColumnOrder} />
                        <TableHeaderRow showSortingControls />
                        <TableEditColumn width={120} showDeleteCommand commandComponent={Command} />
                        <PagingPanel pageSizes={pageSizes} />
                    </Grid>
            
                    <Dialog
                        open={!!deletingRows.length}
                        onClose={this.cancelDelete}
                        classes={{ paper: classes.dialog }}
                    >
                        <DialogTitle>Delete Row</DialogTitle>
                        <DialogContent>
                            <DialogContentText>Are you sure you want to delete the record?</DialogContentText>
                            <Paper>
                                <Grid rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)} columns={columns} >
                                    <Table columnExtensions={tableColumnExtensions} cellComponent={Cell} />
                                    <TableHeaderRow />
                                </Grid>
                            </Paper>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.cancelDelete} color="primary">Cancel</Button>
                            <Button onClick={this.deleteRows} color="secondary">Delete</Button>
                        </DialogActions>
                    </Dialog>
                </Paper>
            </div>
        );
    }
}

Compare.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Compare);
