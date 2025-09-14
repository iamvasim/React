// const h2 = React.createElement('h2' ,{className:'subheading'}, 'hello wasim');

const container = React.createElement('div' ,{className:'container'}, 
    [
       React.createElement('section',{},
        [
            React.createElement('p',{},'my name is wasim khan')
        ]
       )
    ]
);


const root = ReactDOM.createRoot(document.querySelector('#root'));

root.render(container);
  