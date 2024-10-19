
import imgUrlDefault from '../src/assets/pexels-rachel-default.jpg';
import imgUrlLime from '../src/assets/pexels-lisa-f.jpg'
import imgUrlOrange from '../src/assets/pexels-j-lewis.jpg'
import imgUrlLemon from '../src/assets/pexels-lukas.jpg'
import imgUrlColaUp from '../src/assets/pexels-cola-up.jpg'
// import imgUrlColaDown from '../src/assets/pexels-cola-down.jpg'
import imgUrlBloodOrange from '../src/assets/pexels-blood-orange-wedge.jpg'
import imgUrlRedLemonSlice from '../src/assets/pexels-red-lemon-slice.jpg'
import imgUrlChampagneBot from '../src/assets/pexels-champagne-bottles.jpg'
import imgUrlMojito from '../src/assets/pexels-lime-mint-drinks.jpg'
import imgUrlScotchTopDown from '../src/assets/pexels-scotch-topdown.jpg'
import imgUrlOrangeSlices from '../src/assets/pexels-orange-slices.jpg'
import imgUrlWhiteWine from '../src/assets/pexels-white-wine.jpg'
import imgUrlRoseWine from '../src/assets/pexels-polina-rose-over.jpg'
import imgUrlRumGold from '../src/assets/pexels-eva-gold.jpg'

let picChoiceScotchTopDown = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlScotchTopDown})`;
let picChoiceBloodOrange = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlBloodOrange})`;
let picChoiceLime = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlLime})`;
let picChoiceLemon = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlLemon})`;
let picChoiceRedLemon = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlRedLemonSlice})`;
let picChoiceOrange = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlOrange})`;
let picChoiceOrangeSlice = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlOrangeSlices})`;
let picImageRoseWine = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlRoseWine})`;
let picImageColaUp = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlColaUp})`;
let picImageMojito = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlMojito})`;
let picImageRumGold = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlRumGold})`;
let picImageWhiteWine = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlWhiteWine})`;
let picImageChampagneBottle = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlChampagneBot})`;
let picImageDefault = `radial-gradient(#2e2c7c68, #4a5ecb5f), url(${imgUrlDefault})`;


let gin = [picChoiceLime, picChoiceLemon, picChoiceBloodOrange, picChoiceRedLemon];
let rum = [picImageColaUp, picImageMojito];
let tequila = [picChoiceLime, picChoiceOrange, picChoiceLemon];
let whiteWine = [picImageWhiteWine, picImageChampagneBottle];
let sloeGin = [picChoiceBloodOrange, picChoiceRedLemon];

export const BackgroundPics = (alc: string) => {

    let new_alc = alc

    let backgroundImage;
    switch (new_alc.toLocaleLowerCase()) {
        case "absinthe":
            backgroundImage = picChoiceLemon;
            break;
        case "amaretto":
            backgroundImage = picChoiceScotchTopDown;
            break;
        case "aquavit":
            backgroundImage = picChoiceBloodOrange;
            break;
        case "bourbon":
            backgroundImage = picChoiceScotchTopDown;
            break;
        case "brandy":
            backgroundImage = picChoiceScotchTopDown;
            break;
        case "cachaca":
            backgroundImage = picChoiceLime;
            break;
        case "champagne":
            backgroundImage = picImageChampagneBottle;
            break;
        case "cognac":
            backgroundImage = picChoiceScotchTopDown;
            break;
        case "creme-de-menthe":
            backgroundImage = picChoiceScotchTopDown;
            break;
        case "gin":
            backgroundImage = gin[Math.floor(Math.random() * gin.length)];
            break;
        case "mezcal":
            backgroundImage = picChoiceOrangeSlice;
            break;
        case "non-alcoholic":
            backgroundImage = picImageDefault; // update 
            break;
        case "rose-wine-aperitif":
            backgroundImage = picImageRoseWine;
            break;
        case "rum":
            backgroundImage = rum[Math.floor(Math.random() * rum.length)];
            break;
        case "rum-dark":
            backgroundImage = picImageColaUp;
            break;
        case "rum-gold":
            backgroundImage = picImageRumGold;
            break;
        case "rum-light":
            backgroundImage = rum[Math.floor(Math.random() * rum.length)];
            break;
        case "rum-spiced":
            backgroundImage = picImageRumGold;
            break;
        case "scotch":
            backgroundImage = picChoiceScotchTopDown;
            break;
        case "sloe-gin":
            backgroundImage = sloeGin[Math.floor(Math.random() * sloeGin.length)];
            break;
        case "sparkling-white-wine":
            backgroundImage = whiteWine[Math.floor(Math.random() * whiteWine.length)];
            break;
        case "tequila":
            backgroundImage = tequila[Math.floor(Math.random() * tequila.length)];
            break;
        case "vermouth":
            backgroundImage = picChoiceScotchTopDown;
            break;
        case "vodka":
            backgroundImage = tequila[Math.floor(Math.random() * tequila.length)];
            break;
        case "whiskey":
            backgroundImage = picChoiceScotchTopDown;
            break;
        case "white-wine-aperitif":
            backgroundImage = whiteWine[Math.floor(Math.random() * whiteWine.length)];
            break;
        default:
            backgroundImage = picImageDefault;
    }
    return backgroundImage

}
