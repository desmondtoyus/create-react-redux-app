import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { listUsers} from "../redux/actions/user.action";

const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);


const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  table: {
    minWidth: 700,
    fontSize:'24px'
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

class Home extends React.Component {


  handleChange = (event, value) => {
        this.props.listUsers(value);
  };

  renderTable = ()=>{
    const { classes } = this.props;
      return(
        <div>
       {this.props.users ? <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell numeric>ID</CustomTableCell>
            <CustomTableCell>Date</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {this.props.users.map(row => {
            return (
              <TableRow className={classes.row}  key={row.id}>
                <CustomTableCell component="th" scope="row">
                  {row.name}
                </CustomTableCell>
                <CustomTableCell numeric>{row.id}</CustomTableCell>
                <CustomTableCell>{row.createdAt}</CustomTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>:null} 
      </div>
      )
  }

  render() {
    const { classes, tabIndex  } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={tabIndex }
            onChange={this.handleChange}
            scrollable
            scrollButtons="on"
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="Item One" icon={<PhoneIcon />} />
            <Tab label="Fetch From Redux" icon={<FavoriteIcon />} />
            <Tab label="Item Three" icon={<PersonPinIcon />} />
            <Tab label="Item Four" icon={<HelpIcon />} />
            <Tab label="Item Five" icon={<ShoppingBasket />} />
            <Tab label="Item Six" icon={<ThumbDown />} />
            <Tab label="Item Seven" icon={<ThumbUp />} />
            <Tab label="Item Seven" icon={<ThumbUp />} />
          </Tabs>
        </AppBar>
        {tabIndex === 0 && <Typography component="div" style={{ padding: 8 * 3 }}>One</Typography>}
        {tabIndex === 1 && <Typography component="div" style={{ padding: 8 * 3 }}> {this.renderTable()}</Typography>}
        {tabIndex === 2 && <Typography component="div" style={{ padding: 8 * 3 }}>Three</Typography>}
        {tabIndex === 3 && <Typography component="div" style={{ padding: 8 * 3 }}>Four</Typography>}
        {tabIndex === 4 && <Typography component="div" style={{ padding: 8 * 3 }}>Five</Typography>}
        {tabIndex === 5 && <Typography component="div" style={{ padding: 8 * 3 }}>Six</Typography>}
        {tabIndex === 6 && <Typography component="div" style={{ padding: 8 * 3 }}>Seven</Typography>}
      </div>
    );
  }
}
const mapStateToProps = state => {
    const { users, tabIndex } = state.users
  
    return { users, tabIndex  };
  };



export default compose(
    withStyles(styles),
    connect(mapStateToProps, {listUsers})
  )(Home);