import React from 'react';
import PropTypes from 'prop-types';
import DataService from '../../services/data.service';
import NavBar from '../../components/NavBar/NavBar.component';
import { withRouter, Link } from 'react-router-dom';
//import Typography from 'material-ui/Typography';


import {
    SortingState, EditingState, PagingState,
    IntegratedPaging, IntegratedSorting,
} from '@devexpress/dx-react-grid';
import {
Grid,
Table, TableHeaderRow, TableEditRow, TableEditColumn,
PagingPanel, DragDropProvider, TableColumnReordering,
} from '@devexpress/dx-react-grid-material-ui';
import Paper from 'material-ui/Paper';
import Dialog, {
DialogActions,
DialogContent,
DialogContentText,
DialogTitle,
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Input from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';
import { TableCell } from 'material-ui/Table';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
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
    <Button
        component={Link} to="/home"
        color="secondary"
    >
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
      <CommandButton
        onExecute={onExecute}
      />
    );
};
  
const Cell = (props) => {
    return <Table.Cell {...props} />;
};
  
const getRowId = row => row.id;

class Compare extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            columns: [
                { name: 'address', title: 'Address' },
                { name: 'area', title: 'Building Area' },
                { name: 'price', title: 'Sale Price' },
                { name: 'tax', title: 'Tax' },
                { name: 'year', title: 'Built Year' },
                { name: 'bedroom', title: 'Number of Bedroom' },
                { name: 'bathroom', title: 'Number of Bathroom' },
                { name: 'lot', title: 'Lot Size' },
            ],
            
            rows:[{
                h_id: '',
                u_id: '',
                bathroomCnt: 0, 
                bedroomCnt: 0,
                buildingQualityID: 0,
                livingAreaSize: 0,
                latitude: 0.0,
                longitude: 0.0,
                lotSize: 0,
                cityID: 0,
                county: '',
                zip: 0,
                yearBuilt: 0,
                storyNum: 0,
                price: 0,
                tax: 0
            }],
            sorting: [],
            rowChanges: {},
            currentPage: 0,
            deletingRows: [],
            pageSize: 0,
            pageSizes: [5, 10, 0],
            columnOrder: ['address', 'area', 'price', 'tax', 'year', 'bedroom', 'bathroom','lot'],
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
            if (index > -1) {
              rows.splice(index, 1);
            }
          });
          this.setState({ rows, deletingRows: [] });
        };
        this.changeColumnOrder = (order) => {
          this.setState({ columnOrder: order });
        };
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
                <Grid
                    rows={rows}
                    columns={columns}
                    getRowId={getRowId}
                >
                    <SortingState
                    sorting={sorting}
                    onSortingChange={this.changeSorting}
                    />
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

                    <Table
                    columnExtensions={tableColumnExtensions}
                    cellComponent={Cell}
                    />
                    
                    <TableColumnReordering
                    order={columnOrder}
                    onOrderChange={this.changeColumnOrder}
                    />
        
                    <TableHeaderRow showSortingControls />
 
                    <TableEditColumn
                    width={120}
                    //showAddCommand={!addedRows.length}
                    //showEditCommand
                    showDeleteCommand
                    commandComponent={Command}
                    />
                    <PagingPanel
                    pageSizes={pageSizes}
                    />
                </Grid>
        
                <Dialog
                    open={!!deletingRows.length}
                    onClose={this.cancelDelete}
                    classes={{ paper: classes.dialog }}
                >
                    <DialogTitle>Delete Row</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the record?
                    </DialogContentText>
                    <Paper>
                        <Grid
                        rows={rows.filter(row => deletingRows.indexOf(row.id) > -1)}
                        columns={columns}
                        >
                        <Table
                            columnExtensions={tableColumnExtensions}
                            cellComponent={Cell}
                        />
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
