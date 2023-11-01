import Wrapper from '../assets/wrappers/AboutPage';

const About = () => {
  return (
    <Wrapper>
      <h3>About</h3>
      <p>
        Introducing "MixMaster," the ultimate party sidekick app that fetches
        cocktails from the hilarious Cocktails DB API. With a flick of your
        finger, you'll unlock a treasure trove of enchanting drink recipes
        that'll make your taste buds dance and your friends jump with joy. Get
        ready to shake up your mixology game, one fantastical mocktail at a
        time, and let the laughter and giggles flow!
      </p>
      <p>
        Created with React, React Router DOM, React Query, Axios, Styled
        Components and Toastify. The Newsletter posts to an API which just logs
        the request, no newsletter is actually sent.
      </p>
      <p>
        The API used to get the cocktails data comes from
        https://www.thecocktaildb.com/
      </p>
    </Wrapper>
  );
};
export default About;
