import '../App.css';
import '../AverageRating.css';
import '../Bar.css';
import '../BarSelector.css';
import '../Button.css';
import '../ChangeBar.css';
import '../Comment.css';
import '../CommentList.css';
import '../Drink.css';
import '../DrinkList.css';
import '../Edit.css';
import '../EditBox.css';
import '../EditIcon.css';
import '../EmojiLogo.css';
import '../FeedBackList.css';
import '../GoogleSignInButton.css';
import '../index.css';
import '../Modal.css';
import '../MoreContainer.css';
import '../MoreOptionsMenu.css';
import '../MyRating.css';
import '../NewBar.css';
import '../NewComment.css';
import '../NewContainer.css';
import '../NewDrink.css';
import '../NewRating.css';
import '../RatingsList.css';
import '../SignInModal.css';
import '../Submit.css';
import '../Time.css';
import '../TropicalDrinkIcon.css';
import '../UserContainer.css';
import '../UserRating.css';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { BarProvider } from './BarContext.js';
// import { UserProvider } from "./UserContext.js";

export const metadata = {
    title: 'Cocktales',
    description: 'Yelp for menu items',
  }

export default function RootLayout({ children }) {
    return   ( 
        // <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}>
        //     <UserProvider>
        //     <BarProvider>
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Proza+Libre:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Kumbh+Sans:wght@100..900&display=swap" rel="stylesheet"/>
                <title>Cocktales</title>
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
        // </BarProvider>
        // </UserProvider>
        // </GoogleOAuthProvider> 
    )
}