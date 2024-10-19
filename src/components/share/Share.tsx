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


interface ShareProps {
    recipeInPlay: string;
    ingredientInPlay: string[];
    garnishInPlay: string[];
    directionsInPlay: string;
    glassInPlay: string;
    shareUrl: string;

}



export const Share: React.FC<ShareProps> = ({ recipeInPlay, ingredientInPlay, garnishInPlay, directionsInPlay, glassInPlay, shareUrl }) => {


    const currentPageUrl = encodeURI(window.location.href)
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


    return (
        <div className='shareIcon' aria-controls="shareMenu" aria-expanded="false" onClick={showShareMenu}>
            <div className="shareIconShareText">
                <BiShareAlt className='iconHeart' />
                <span>Share</span>
            </div>


            <div className="shareDropDown">
                <FacebookShareButton
                    url={currentPageUrl}
                    hashtag={`#${titleCase(recipeInPlay)}`}
                >
                    <FaFacebookSquare className='shareIcons' id="facebookShare" />
                </FacebookShareButton>

                {/* <FacebookMessengerShareButton
                    url={currentPageUrl}
                    appId={fbAppId}
                    redirectUri={shareUrl}>
                    <FaFacebookMessenger className='shareIcons' id="messengerShare" />
                </FacebookMessengerShareButton> */}

                {/* <TwitterShareButton
                    url={`\n${currentPageUrl}`}
                    quote="drink recipes"
                    hashtag={`#${titleCase(recipeInPlay)}`}
                    title={`How to make a ${recipeInPlay}`}
                >
                    <FaSquareXTwitter className='shareIcons' id="xShare" />
                </TwitterShareButton> */}

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
