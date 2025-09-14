// create element
const element = React.createElement('h1', {id:"first",className:"wasim",style:{backgroundColor:"blue",fontSize:"90px",color:"yellow"}}, "my name is wasim");
const element2 = React.createElement('h2', {id:"second",className:"wasim",style:{backgroundColor:"blue",fontSize:"90px",color:"yellow"}}, "student ");
// root ko select karo

// div{
//     <h1>my name is wasim</h1>
//     <h2>student</h2>
// } isko ham aaise likh sakte jaise niche likha hua hai 

const div1=React.createElement('div',{},[element,element2]);

 const Reactroot = ReactDOM.createRoot(document.getElementById('root'));


// element ko root me daal do
// Reactroot.render(element); aisa krne pr ek hide ho jata hai 
// Reactroot.render(element2)

// jaise upr render kiye hai waise n krke jaise niche render krenge to dono element dikhenge 
Reactroot.render(div1);
   