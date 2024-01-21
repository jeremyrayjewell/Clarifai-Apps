import React, { useState } from "react";
const FaceRecognition = ({ imageUrl, boundingBoxes }) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className='center ma' style={{position: 'relative', display: 'inline-block'}}>
            <img 
                id='inputImage'
                alt='' 
                src={imageUrl} 
                width='500px' 
                height='auto' 
                onLoad={() => setImageLoaded(true)}
            />
            {imageLoaded && boundingBoxes.map((boundingBox, index) => {
                return (
                    <div 
                        key={index} 
                        className='bounding-box' 
                        style={{
                            top: boundingBox.topRow, 
                            right: boundingBox.rightCol, 
                            bottom: boundingBox.bottomRow, 
                            left: boundingBox.leftCol, 
                            position: 'absolute', 
                            boxSizing: 'border-box',
                            boxShadow: '0 0 0 3px #149df2 inset',
                            display: 'flex',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            zIndex: 4,
                        }}
                    ></div>
                );
            })}
        </div>
    );
}

export default FaceRecognition;
