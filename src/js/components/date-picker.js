// Externals
import React from 'react';
import moment from 'moment';
//Components
import DisplayField from './display-field';
import InputMoment from 'input-moment';

/**
 * Props : 
 * value : moment
 * onChange : func
 * onSave : func
 */
class DateField extends React.Component {

	constructor(props) {
		super();
		this.state = {
            isEdit : false,
            date: props.value
		};
    }

    componentWillReceiveProps(newProps)    {
        this.setState({
            date: newProps.value
        });
    }

    enableEdit(){
        this.setState({
            isEdit : true
        });
    }

    disableEdit(){
        const {onSave} = this.props;
        this.setState({
            isEdit : false
        });
        if(onSave){
            onSave(this.state.date);
        }
    }

    onDateChange(value){
        const {onChange} = this.props;
        this.setState({
            date : value
        });
        if(onChange){
            onChange(value);
        }
    }

	render(){
        const {isEdit, date} = this.state;

		return (
            <div className='date-field'>
                {!isEdit && <div onClick={this.enableEdit.bind(this)}>
					{moment(date).format('DD/MM/YYYY HH:mm')}
                </div>}
        
                {isEdit && <div className='date-picker'>
					<InputMoment
						moment = {date}
						onChange = {this.onDateChange.bind(this)}
						onSave = {this.disableEdit.bind(this)}
					/>
				</div>}
			</div>
		);
	}
}

DateField.displayName=('date-field');
export default DateField;
