import styled from "styled-components";
import Link from "../types/links";
import { useScreen } from "../hooks/useScreen";
import ThemeToggle from "./shared/themeToggle";
import { useState } from "react";
import { useTheme } from "../context/themeContext";
import { NavLink, Link as A } from "react-router-dom";

export default function Navbar({ links }: { links: Link[] }) {
  const { isMobile } = useScreen(768);
  const [burgerMenuClass, setBurgerMenuClass] = useState<string | null>();
  const [renderBurgerMenu, setRenderBurgerMenu] = useState<boolean>(false);
  const { theme } = useTheme();

  const activeBurgerMenu = () => {
    setRenderBurgerMenu(true);
    setBurgerMenuClass("active");
  };

  const hiddeBurgerMenu = () => {
    setBurgerMenuClass("inactive");
    setTimeout(() => {
      setRenderBurgerMenu(false);
    }, 300);
  };

  return (
    <Nav theme={theme}>
      <A to="/" className="logo">
        <img src="https://pngimg.com/d/star_wars_logo_PNG34.png" alt="logo"/>
      </A>
      {!isMobile ? (
        <div className="content-desktop">
          <div className="content-left">
            <div className="links">
              {links.map((link) => (
                <NavLink to={link.route} key={link.name}>
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="content-right">
            <ThemeToggle />
          </div>
        </div>
      ) : (
        <span className="material-symbols-outlined" onClick={activeBurgerMenu}>
          menu
        </span>
      )}
      {renderBurgerMenu && (
        <div className={`burger-menu ${burgerMenuClass}`}>
          <div className="top">
            <span
              className="material-symbols-outlined"
              onClick={hiddeBurgerMenu}
            >
              close
            </span>
          </div>
          <div className="burger-menu-content">
            {links.map((link) => (
              <NavLink to={link.route} key={link.name}>
                {link.name}
              </NavLink>
            ))}
            <div className="theme-toggle">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </Nav>
  );
}

const Nav = styled.div`
  height: 6em;
  display: flex;
  align-items: center;
  background-color: ${({theme})=>theme.darkBg};
  color: ${({theme})=>theme.font};
  padding: 0 20px;
  position: relative;
  justify-content: space-between;
  position: fixed;
  width: 100vw;
  z-index: 30;

  @media (768px <= width) {
    padding: 0 40px;
  }

  .content-desktop {
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo {
    border-right: 1px solid ${({theme})=>theme.font};
    color: ${({theme})=>theme.font};
    padding-right: 30px;
    z-index: 50;
    
    img {
      height: 80px;
    }

    @media (768px <= width) {
      font-size: 18px;
      padding-right: 50px;
    }
  }

  .content-left {
    display: flex;
    align-items: center;
    position: relative;
    color: ${({theme})=>theme.font};

    .links {
      margin-left: 20px;
      height: 6em;
      display: flex;
      align-items: center;

      a {
        margin-right: 25px;
        height: 100%;
        display: flex;
        align-items: center;
        position: relative;
        color: ${({theme})=>theme.font};

        &::after {
          position: absolute;
          content: "";
          height: 3px;
          background-color: #ee6838;
          bottom: 0;
          left: 0;
          width: 0;
          transition: all 0.3s ease;
        }

        &:hover {
          &::after {
            width: 100%;
          }
        }
      }
    }
  }

  .content-right {
    display: flex;
    align-items: center;
  }

  .burger-menu {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: ${({theme})=>theme.darkBg};
    z-index: 40;

    &.active {
      transform: translateX(-100%);
      animation: show 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0s 1 normal forwards;
      @keyframes show {
        100% {
          transform: translateX(0);
        }
      }
    }

    &.inactive {
      animation: hidde 0.3s cubic-bezier(0.23, 1, 0.32, 1) 0s 1 normal forwards;
      @keyframes hidde {
        100% {
          transform: translateX(-100%);
        }
      }
    }

    .top {
      height: 6em;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: end;
      border-bottom: 1px solid ${({theme})=>theme.font};
    }

    .burger-menu-content {
      a,
      .theme-toggle {
        display: block;
        width: 100%;
        padding: 20px;
        border-bottom: 1px solid ${({theme})=>theme.font};
        color: ${({theme})=>theme.font};
      }
    }
  }
`;
