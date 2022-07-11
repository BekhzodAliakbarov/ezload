import FacebookIcon from 'components/icons/facebook.icon';
import InstagramIcon from 'components/icons/instagram.icon';
import LinkedinIcon from 'components/icons/linkedin.icon';
import TelegramIcon from 'components/icons/telegram.icon';
import TopIcon from 'components/icons/top.icon';
import Text from 'components/typography/text';
import React from 'react';
import { Link } from 'react-router-dom';
import {
  FooterContentBox,
  FooterRightContentItemWrapper,
  FooterLeftContent,
  FooterLeftContentLinksBox,
  FooterLeftContentLinksWrapper,
  FooterRightContent,
  FooterWrapper,
  LinksWrapper,
  FooterSocialLinksWrapper,
  StyledIconButton,
  FooterButton,
  StyledTopButtonIcon,
} from './footer.styles';
const leftLinks = [
  {
    id: 1,
    name: 'Company Overview',
    to: '/',
  },
  {
    id: 2,
    name: 'Terms of Use',
    to: '/',
  },
  {
    id: 3,
    name: 'Privacy Policy',
    to: '/',
  },
  {
    id: 4,
    name: 'Copyrights',
    to: '/',
  },
];
const rightLinks = [
  {
    id: 1,
    name: 'Profile',
    to: '/',
  },
  {
    id: 2,
    name: 'My Loads',
    to: '/',
  },
  {
    id: 3,
    name: 'My adresses',
    to: '/',
  },
];

const Footer = () => {
  const clickHandler = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  return (
    <FooterWrapper>
      <FooterContentBox>
        <FooterLeftContent>
          <FooterLeftContentLinksWrapper>
            <FooterLeftContentLinksBox>
              <Text weight="600">About Us</Text>
              <LinksWrapper>
                {leftLinks.map((link) => (
                  <Link key={link.id} to={link.to}>
                    {link.name}
                  </Link>
                ))}
              </LinksWrapper>
            </FooterLeftContentLinksBox>
            <FooterLeftContentLinksBox>
              <Text weight="600">My account</Text>
              <LinksWrapper>
                {rightLinks.map((link) => (
                  <Link key={link.id} to={link.to}>
                    {link.name}
                  </Link>
                ))}
              </LinksWrapper>
            </FooterLeftContentLinksBox>
          </FooterLeftContentLinksWrapper>
          <Text weight="400">© All rights reserved. Ezload 2022</Text>
        </FooterLeftContent>
        <FooterRightContent>
          <FooterRightContentItemWrapper>
            <Text weight="400">Customer Support on Telegram:</Text>
            <h1>@ezloadsupportobot</h1>
          </FooterRightContentItemWrapper>
          <FooterRightContentItemWrapper>
            <Text weight="400">Follow us on social media</Text>
            <FooterSocialLinksWrapper>
              <StyledIconButton>
                <TelegramIcon />
              </StyledIconButton>
              <StyledIconButton>
                <InstagramIcon />
              </StyledIconButton>
              <StyledIconButton>
                <FacebookIcon />
              </StyledIconButton>
              <StyledIconButton>
                <LinkedinIcon />
              </StyledIconButton>
            </FooterSocialLinksWrapper>
          </FooterRightContentItemWrapper>
          <FooterButton onClick={clickHandler}>
            <StyledTopButtonIcon>
              <TopIcon />
            </StyledTopButtonIcon>
          </FooterButton>
        </FooterRightContent>
      </FooterContentBox>
    </FooterWrapper>
  );
};

export default Footer;
