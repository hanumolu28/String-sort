import React, { Component } from 'react';  
import { connect } from 'react-redux';
import { addString,removeString } from '../actions'
import '../styles/main.scss';

class StringSort  extends Component {

	constructor(props){
		super(props);
		this.state = {
			addString : this.props.addString,
			sortedArray:  this.props.sortedArray,
			deleteElement : this.props.deleteElement,
			val : ""
		};
		this.changeVal = this.changeVal.bind(this);
		this.addString = this.addString.bind(this);
		this.showSortedTable = this.showSortedTable.bind(this);
		this.deleteElement =  this.deleteElement.bind(this);
	}
	addString(evt) {
      	evt.preventDefault();
        this.setState({val: document.getElementById('strInput').value})
      	if(document.getElementById('strInput').value !== "") this.state.addString(document.getElementById('strInput').value);
      	document.getElementById('strInput').value = '';
  	}
  	deleteElement(ele) {
  		this.state.deleteElement(ele);
  	}
	changeVal (evt) {
		 //	;
	}
	showSortedTable() {
		let arrayLength = this.props.sortedArray.length;
		// If Array is empty return empty
		if(arrayLength === 0) return (<tbody></tbody>);
		else if(arrayLength < 5) {
			//initial 4 elements sorting
			return (
				<tbody><tr> 
	            {
	              this.props.sortedArray.map(value => {
	                return (<td><a onClick={this.deleteElement.bind(null, value)} className="delStr">{value}</a></td>)
	              })
	            } 
            </tr></tbody>
			)
		}
		else {

			let numberOfRows = Math.ceil(this.props.sortedArray.length/4);
			let numberOfEmptyFields = this.props.sortedArray.length%4;
			let outputArray = new Array(numberOfRows);
			let outputTable = [];
			// Creating two dimentional Array with sorted array. 
			//If the sorted array % 4 is not equal to zero, then place empty Values first
			// Then Loop throught the Array to place it in Rows, cols

			for(let i=0; i < numberOfRows; i++ ){
				outputArray[i]= new Array(4);

				
			}
			while(numberOfEmptyFields < 4 && numberOfEmptyFields != 0) {
				outputArray[numberOfRows-1][numberOfEmptyFields] = '';
				numberOfEmptyFields ++;
			}
			
			let row =0,col =0;


			for(var i=0;i<this.props.sortedArray.length;i++) {
				if(outputArray[row][col] == '') {
					i--;
				}
				else {
					outputArray[row][col] = this.props.sortedArray[i];
				}

				if(row == (numberOfRows-1)) {
					row = 0;
					col++;
				}
				else {
					row++;

				}
			}
			
			return(
			 <tbody> 
				{outputArray.map((item) => {
					return (<tr>{
							Object.values(item).map((ele) => {
								return (<td><a onClick={this.deleteElement.bind(null, ele)} className="delStr">{ele}</a></td>)
							})}
						</tr>)

				})
			}
				</tbody>
			)

		}

	}
	render() {
		console.log(this.props.sortedArray);
    return (
      <div>
        <form onSubmit={this.addString} className='strForm'>
         	<input type="text" name="strInputVal" id="strInput"/>
          	<button type="submit">
            	Submit
          	</button>
            <p> Output:</p>
            <table>{this.showSortedTable()}</table>
        </form>
      </div>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
    addString: (val) => {
        dispatch(addString(val))
    },
    deleteElement : (val) => {
    	dispatch(removeString(val))
    }
})
const mapStateToProps = (state) => ({
    sortedArray : state.arrayString
})

export default connect(mapStateToProps, mapDispatchToProps)(StringSort)
