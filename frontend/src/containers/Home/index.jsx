import styled from 'styled-components';

import { ReactComponent as Free } from '@assets/images/free.svg';
import { ReactComponent as Analysis } from '@assets/images/analysis.svg';
import { ReactComponent as Web } from '@assets/images/web.svg';

const Hero = styled.section`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  text-align: center;
  padding: 48px 0 88px;

  @media (min-width: 641px) {
    text-align: left;
    padding: 88px 0 120px;
  }
`;

const HeroCopy = styled.div`
  position: relative;
  @media (min-width: 641px) {
    padding-top: 40px;
    padding-right: 48px;
    min-width: 448px;
    max-width: 512px;
    z-index: 1;
  }

  ~ svg {
    margin: 2rem auto 0;
    box-shadow: 48px 16px 48px rgba(24, 37, 56, 0.12);
    border-radius: 4px;
    transform: perspective(1000px) rotateY(16deg) rotateX(2deg) rotateZ(-4deg)
      scaleY(0.95) translatex(2%);
  }
`;

const H1 = styled.h1`
  margin-top: 0;
  margin-bottom: 1rem;
  font-size: 3rem;
  line-height: 54px;
  letter-spacing: 0px;
  font-weight: 600;

  @media (min-width: 641px) {
    margin-bottom: 16px;
  }

  @media (max-width: 400px) {
    font-size: 2rem;
  }
`;

const Paragraph = styled.p`
  margin-top: 0;
  color: #8595ae;
  font-size: 1rem;
  line-height: 30px;

  @media (min-width: 641px) {
    margin-bottom: 32px;
  }
`;

const FeatureWrapper = styled.div`
  padding: 50px 0;
  `;

const FeatureImageWrapper = styled.div`
  margin-top: 64px;
  margin-bottom: 112px;
  display: flex;
  
  > svg {
    padding: 16px;
    margin: 0 auto;
    display: block;
    box-shadow: 48px 16px 48px rgba(24, 37, 56, 0.12);
    transform: perspective(1000px) rotateY(10deg) translateY(2%) scale(0.9);
    max-width: 100%;
  }

  &.reverse {
    flex-direction: row-reverse;

    > svg {
      transform: perspective(1000px) rotateY(-10deg) translateY(2%) scale(0.9);
    }

    @media (max-width: 992px) {
    flex-direction: column-reverse;

    > div {
      width: 100%;
      max-width: 100%;
    }

    svg {
      transform: none
    }
  }
  }

  @media (max-width: 992px) {
    flex-direction: column-reverse;

    > div {
      width: 100%;
      max-width: 100%;
    }

    svg {
      transform: none
    }
  }
`;

const Home = () => (
  <>
    <section>
      <Hero>
        <HeroCopy>
          <H1>Lorem ipsum dolor sit amet consectetur</H1>
          <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            modi minus accusamus provident, itaque, reprehenderit sapiente
            dolorem esse laboriosam voluptas alias magnam.
          </Paragraph>
        </HeroCopy>
        <Free />
      </Hero>
    </section>

    <section>
      <FeatureWrapper>
        <FeatureImageWrapper>
          <Analysis />
          <HeroCopy>
            <H1 as="h2">Lorem ipsum dolor sit amet consectetur</H1>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              modi minus accusamus provident, itaque, reprehenderit sapiente
              dolorem esse laboriosam voluptas alias magnam.
            </Paragraph>
          </HeroCopy>
        </FeatureImageWrapper>
      </FeatureWrapper>
    </section>

    <section>
      <FeatureWrapper>
        <FeatureImageWrapper className="reverse">
          <Web />
          <HeroCopy>
            <H1 as="h2">Lorem ipsum dolor sit amet consectetur</H1>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              modi minus accusamus provident, itaque, reprehenderit sapiente
              dolorem esse laboriosam voluptas alias magnam.
            </Paragraph>
          </HeroCopy>
        </FeatureImageWrapper>
      </FeatureWrapper>
    </section>
  </>
);

export default Home;
