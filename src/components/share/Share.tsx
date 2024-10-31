import { Link } from 'react-router-dom'
import './share.css';
import { BiShareAlt } from 'react-icons/bi';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaTumblrSquare } from 'react-icons/fa';
import { FaFacebookMessenger } from 'react-icons/fa';
import { FaWhatsappSquare } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';
import {
    FacebookShareButton,
    TwitterShareButton,
    FacebookMessengerShareButton,
    WhatsappShareButton
} from 'react-share';

import { HeadProvider, Title, Meta } from 'react-head';
import shareImage from '../../assets/og_img_one.png';
import { useEffect } from 'react';


declare global {
    interface Window {
        fbAsyncInit: () => void;
        FB: any;
    }
}


interface ShareProps {
    recipeInPlay: string;
    ingredientInPlay: string[];
    garnishInPlay: string[];
    directionsInPlay: string;
    glassInPlay: string;
    shareUrl: string;

}



export const Share: React.FC<ShareProps> = ({ recipeInPlay, ingredientInPlay, garnishInPlay, directionsInPlay, glassInPlay, shareUrl }) => {

    const fbAppId: string | undefined = process.env.REACT_APP_FB_APP_ID

    const showShareMenu = () => {
        let shareBarMenu: Element | null = document.querySelector('.shareIcon')
        let shareVisibility = shareBarMenu?.getAttribute('data-visible')
        let shareDropDown = document.querySelector('.shareDropDown');


        if (shareVisibility == null || shareVisibility === "false") {
            shareBarMenu?.setAttribute('aria-expanded', 'true')
            shareBarMenu?.setAttribute('data-visible', 'true')
            shareDropDown?.classList.add('show')
        } else {
            shareBarMenu?.setAttribute('aria-expanded', 'false')
            shareBarMenu?.setAttribute('data-visible', 'false')
            shareDropDown?.classList.remove('show')
        }
    }

    function titleCase(str: string) {
        if (str.includes("-")) {
            str = str.replace('-', ' ')
        }
        return str.toLowerCase().split(' ').map(function (word) {
            return (word.charAt(0).toUpperCase() + word.slice(1));
        }).join(' ').replaceAll(" ", "");
    }



    const getTumbElement = () => {
        let drinkInstructions = directionsInPlay.split("\r\n");
        let tumblrLink = "https://www.tumblr.com/widgets/share/tool?" +
            "posttype=text" +
            "&tags=KeepsGuide," + encodeURIComponent(recipeInPlay.replace(/\s/g, "")) +
            "&title=" + encodeURIComponent("Keep's Guide Recipe:\n" + recipeInPlay) +
            "&content=" +
            "<b>Ingredients:</b>" +
            `<ul>${ingredientInPlay.map((iip: string) => `<li>${encodeURIComponent(iip.replace(".00", ""))}</li>`).join('')}</ul>` +
            "<b>Garnish:</b>" +
            `<ul>${garnishInPlay.map((gip: string) => `<li>${encodeURIComponent(gip.replace("0", "").trim())}</li>`).join('')}</ul>` +
            "<b>Serving Glass:</b>" + `<ul><li>${encodeURIComponent(glassInPlay)}</li></ul>` +
            "<b> Mixing Instructions:</b>" +
            `<ol>${drinkInstructions.map((dip: string) => `<li>${encodeURIComponent(dip.replace(/[0-9]./, "").trim())}</li>`).join('')}</ol>` +
            `<b>Find More at <a>${encodeURIComponent(shareUrl)}</a></b>` +
            "&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button";

        // Check if the element exists
        const tumblrQuoteElement = document.getElementById("tumblr-quote");
        if (tumblrQuoteElement) {
            (tumblrQuoteElement as HTMLAnchorElement).href = tumblrLink;
        }
    };



    const shareToFacebook = () => {
        if (window.FB) {
            window.FB.ui({
                method: 'share',
                href: shareUrl,
                quote: `Try making this amazing ${recipeInPlay}!`,
                hashtag: `#${titleCase(recipeInPlay)}`,
                image: shareImage,
                display: 'popup'
            }, function (response: any) {
                if (response) {
                    console.log('Post was shared successfully', response)
                } else {
                    console.error('Error while sharing')
                }
            });
        } else {
            alert('Facebook SDK not loaded.')
        }
    }

    useEffect(() => {
        if (!fbAppId) return;

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: `${process.env.REACT_APP_FB_APP_ID}`,
                cookie: true,
                xfbml: true,
                version: 'v12.0',
            });

            window.FB.AppEvents.logPageView();

        };

        (function (d, s, id) {
            const element = d.getElementById(id)
            if (element) return;

            const js = d.createElement(s) as HTMLScriptElement;
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0' //'https://connect.facebook.net/en_US/sdk.js'
            const fjs = d.getElementsByTagName(s)[0]
            fjs.parentNode?.insertBefore(js, fjs)
        }(document, 'script', 'facebook-jssdk'));

    }, [fbAppId])



    return (
        <div className='shareIcon' aria-controls="shareMenu" aria-expanded="false" onClick={showShareMenu}>
            <HeadProvider>
                <Title>{recipeInPlay.length > 0 ? recipeInPlay : 'Drink Recipe'}</Title>
                <Meta property="og:title" content={recipeInPlay} />
                <Meta property="og:description" content={`Try making this amazing ${recipeInPlay}.`} />
                <Meta property="og:image" content={shareImage} />
                <Meta property="og:url" content={shareUrl} />
                <Meta property="og:type" content="website" />
                <Meta property="twitter:card" content="summary_large_image" />
                <Meta property="twitter:image" content={shareImage} />

            </HeadProvider>

            <div className="shareIconShareText">
                <BiShareAlt className='iconHeart' />
                <span>Share</span>
            </div>


            <div className="shareDropDown">

                <button onClick={shareToFacebook}>
                    <FaFacebookSquare className='shareIcons' id='facebookShare' />
                </button>

                <TwitterShareButton
                    url={shareUrl} // Link to your recipe page
                    title={`How to make a ${recipeInPlay}`} // Sets the title to be shared
                    hashtags={[titleCase(recipeInPlay)]} // Hashtag for the recipe
                >
                    <FaSquareXTwitter className="shareIcons" id="xShare" />
                </TwitterShareButton>


                {/* <FacebookMessengerShareButton
                    url={currentPageUrl}
                    appId={fbAppId}
                    redirectUri={shareUrl}>
                    <FaFacebookMessenger className='shareIcons' id="messengerShare" />
                </FacebookMessengerShareButton> */}

                <Link to="https://www.tumblr.com/widgets/share/tool" className="button" id="tumblr-quote"
                    title="post this recipe" target="_blank" rel="noopener noreferrer">
                    <FaTumblrSquare className='shareIcons' id="tmblrShare"
                        onClick={getTumbElement} />
                </Link>

                {/* <WhatsappShareButton
                    // title={`How to make a ${recipeInPlay}`}
                    quote={`How to make a ${recipeInPlay}`}
                    url={`\n${shareUrl}`}
                    hashtag={`#${titleCase(recipeInPlay)}`}
                >
                    <FaWhatsappSquare className='shareIcons' id="whatsAppShare" />
                </WhatsappShareButton> */}

                <a href={`mailto:?subject=Keep's Guide's recipe for a ${recipeInPlay}&body=Check out the recipe at ${shareUrl}`}
                    title="Share by Email" target="_blank" rel="noopener noreferrer">
                    <HiOutlineMail className='shareIcons' id="emailShare" />
                </a>
            </div>
        </div>
    )
}
