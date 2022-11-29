import React from 'react';
import NewTicketForm from './NewTicketForm';
import TicketList from './TicketList';
import EditTicketForm from './EditTicketForm';
import TicketDetail from './TicketDetail';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class TicketControl extends React.Component {

  
  constructor(props) {
    super(props);
    this.state = {
      selectedTicket: null,
      editing: false
    };
  }

  
  handleClick = () => {
    if (this.state.selectedTicket != null) {
      this.setState({
        selectedTicket: null,
        editing: false
      });
    } else {
      const {dispatch} = this.props;
      const action = {
        type: 'TOGGLE_FORM'
      }
      dispatch(action);
    }
  }
  

  handleDeletingTicket = (id) => {
    const { dispatch } = this.props;
    const action = {
      type: 'DELETE_TICKET',
      id: id
    }
    dispatch(action);
    this.setState({selectedTicket: null});
  }
  
  handleEditClick = () => {
    this.setState({editing: true});
  }

  handleEditingTicketInList = (ticketToEdit) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = ticketToEdit;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    this.setState({
      editing: false,
      selectedTicket: null
    });
  }

  handleAddingNewTicketToList = (newTicket) => {
    const { dispatch } = this.props;
    const { id, names, location, issue } = newTicket;
    const action = {
      type: 'ADD_TICKET',
      id: id,
      names: names,
      location: location,
      issue: issue,
    }
    dispatch(action);
    const action2 = {
      type: 'TOGGLE_FORM'
    }
    dispatch(action2);
  }
  
  handleChangingSelectedTicket = (id) => {
    const selectedTicket = this.props.mainTicketList[id];
    this.setState({selectedTicket: selectedTicket});
  }
  
  render(){
    let currentlyVisibleState = null;
    let buttonText = null; 
    if (this.state.editing ) {      
      currentlyVisibleState = <EditTicketForm ticket = {this.state.selectedTicket} onEditTicket = {this.handleEditingTicketInList} />
      buttonText = "Return to Ticket List";
    } else if (this.state.selectedTicket != null) {
      currentlyVisibleState = <TicketDetail 
      ticket={this.state.selectedTicket} 
      onClickingDelete={this.handleDeletingTicket}
      onClickingEdit = {this.handleEditClick} />
      buttonText = "Return to Ticket List";
    } else if (this.props.formVisibleOnPage) {
      currentlyVisibleState = <NewTicketForm onNewTicketCreation={this.handleAddingNewTicketToList}/>;
      buttonText = "Return to Ticket List"; 
    } else {
      currentlyVisibleState = <TicketList onTicketSelection={this.handleChangingSelectedTicket} ticketList={this.props.mainTicketList} />;
      buttonText = "Add Ticket"; 
    }
    return (
      <React.Fragment>
        {currentlyVisibleState}
        <button onClick={this.handleClick}>{buttonText}</button> 
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    mainTicketList: state.mainTicketList,
    formVisibleOnPage: state.formVisibleOnPage
  }
}

TicketControl = connect(mapStateToProps)(TicketControl);

TicketControl.propTypes = {
  mainTicketList: PropTypes.object,
  formVisibleOnPage: PropTypes.bool
};

export default TicketControl;

