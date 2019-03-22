// Reducer to handle AddString & DelString Actions

const arrayStringManipulations = (state = [], action) => {
  switch (action.type) {
    case 'ADD_STRING':{
    	 // if the Input value is a list of string with comma separeted, then split them and add them to array
    	 // else just add that element
    	if(action.newString.indexOf(',') > -1) {

			let stringList = action.newString.split(",");
			/*for(var i=0;i<stringList.length;i++){
				if(stringList[i] != "") 
				AddorDelElement(state,stringList[i], true)
			}*/
			// Gotta make this action synchronus.
			const start = async () => {
				await stringList.forEach( async(str) => {
					await AddorDelElement(state,str, true)
				});
			}
			start();
		}    
      	else {
      		AddorDelElement(state,action.newString, true)
      	}
      	return [...state];
  	}
  	case 'DEL_STRING' : {
  		AddorDelElement(state,action.newString, false)
      	return [...state];

  	}
  	
    default:
      return [...state];
  }
}

// Binary Search performed in insert or delete element from the Array.
const AddorDelElement = (array, val, b) => {
	let start=0, end=array.length-1;

    while (start<=end) { 
        let mid=Math.floor((start + end)/2); 
        if (array[mid] === val) {
        	// if B is true add element to Array else delete it
        	if(b) array.splice(mid, 0, val);
        	else  array.splice(mid, 1);
        	return;
        }
        else if (array[mid] < val)  
             start = mid + 1; 
        else
             end = mid - 1; 
    } 
    if(b)  array.splice(start, 0, val);   
    return; 
}

export default arrayStringManipulations
