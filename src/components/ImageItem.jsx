import React from 'react'

function ImageItem(props) {
    return (
        <img className='image-preview' src={props.url} />
    )
}

export default ImageItem