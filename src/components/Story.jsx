import React, { useState } from 'react'
import { useEffect } from 'react';
import Editor from 'react-simple-wysiwyg';

export const Story = ({ setStory, uploaded, story }) => {
    const [html, setHtml] = useState("write something...")

    useEffect(() => {
        setHtml(story)
    }, [story])

    return (
        <Editor value={html} onChange={(e) => setHtml(e.target.value)}
            onBlur={() => setStory(html)} />
    );
};

