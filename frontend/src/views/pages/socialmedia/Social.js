import React from 'react';
import { FacebookShareButton, FacebookIcon, TwitterIcon, TwitterShareButton } from 'react-share';

const Socail = () => {
    return (
        <div>
            <FacebookShareButton
                url={'https://www.example.com'}
                quote={'Dummy text!'}
                hashtag="#muo"
            >
                <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
                url={'https://www.example.com'}
                quote={'Dummy text!'}
                hashtag="#muo"
            >
                <TwitterIcon size={32} round />
            </TwitterShareButton>
            <h1>Page Under development.......</h1>
        </div>
    );
};

export default Socail;