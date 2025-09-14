import React from 'react'
import { useState } from 'react';
const UseToogle = (defaultVAl) => {

    const [value ,setvalue]= useState(defaultVAl);
    function toggleValue(val){
        if(typeof val !='boolean'){
            setvalue(!value);
        }
        else{
            setvalue(val)
        }

    }
  return [value,toggleValue];
    
  
}

export default UseToogle