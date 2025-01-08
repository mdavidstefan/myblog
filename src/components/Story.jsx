import React from 'react'

import Editor from 'react-simple-wysiwyg';
import { useState } from 'react';

//https://www.npmjs.com/package/react-quilljs

const editorStyle={ 
    maxWidth: 500,
    minHeight: 300,
    display:'flex',
    flexDirection:'column',
    justifyContent:'between',
    backgroundColor:'whitesmoke',
    color:'black',
    margin:'auto'
}


export const Story = ({setStory,uploaded}) => {
    const [html, setHtml] = useState("write something...")
    
    return (
      
        <Editor value={html} onChange={(e)=>setHtml(e.target.value)} 
                onBlur={ ()=>setStory(html) } />
    
    );
};

