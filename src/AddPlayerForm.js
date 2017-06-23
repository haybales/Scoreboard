import React from 'react';

var AddPlayerForm = React.createClass({
  getInitialState: function(){
    return{
      value: '',
    };
  },

  handleChange: function(e){
    return(this.setState({value: e.target.value}));
  },

  render: function(){
    return(
      <div className="add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
          <input type="submit" value="Add Player" />
        </form>
      </div>
    );
  },

  propTypes: {
    addPlayer: React.PropTypes.func.isRequired,
  },

  onSubmit: function(e){
    e.preventDefault();
    this.props.addPlayer(this.state.value);
    this.setState({value: ''});
  },

});

export default AddPlayerForm;
