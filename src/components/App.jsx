import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addReminder, deleteReminder, clearReminders } from '../action';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      dueDate: ''
    };
  }

  addReminder = () => {
    console.log(this.dueDate);
    this.props.addReminder(this.state.text, this.state.dueDate);
  };

  deleteReminder(id) {
    console.log('deleting this id', id);
    console.log('this.props   ', this.props);
    this.props.deleteReminder(id);
  }

  renderReminders() {
    const { reminders } = this.props;
    return (
      <ul className="list-group col-sm-4">
        {reminders.map(reminder => {
          return (
            <li key={reminder.id} className="list-group-item">
              <div className="list-item">
                <div>{reminder.text}</div>
                <div>
                  <em> {moment(new Date(reminder.dueDate)).fromNow()}</em>
                </div>
              </div>

              <div
                className="list-item delete-button"
                onClick={() => this.deleteReminder(reminder.id)}
              >
                &#x2715;
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  render() {
    return (
      <div className="App">
        <div className="title">Reminder Pro</div>
        <div className="form-inline reminder-form">
          <div className="form-group">
            <input
              className="form-control"
              placeholder="I have to..."
              onChange={e => this.setState({ text: e.target.value })}
            />
            <input
              type="datetime-local"
              className="fomr-control"
              onChange={e => this.setState({ dueDate: e.target.value })}
            />
          </div>
          <button
            type="button"
            className="btn btn-success"
            onClick={this.addReminder}
          >
            Add Reminder
          </button>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.props.clearReminders()}
          >
            Clear all
          </button>
        </div>
        {this.renderReminders()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    reminders: state
  };
}

export default connect(mapStateToProps, {
  addReminder,
  deleteReminder,
  clearReminders
})(App);
