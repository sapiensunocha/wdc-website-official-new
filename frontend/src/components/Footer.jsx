import React from "react";
import Section from "./Section";
import { socials } from "../constants";
import NewsLetter from "./newsletter";
import WDC from "../assets/images/wdclogobg.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Section crosses className="!px-0 !py-10">
      <div className="container flex justify-center ">
        <div>
          <NewsLetter />
        </div>
      </div>
      <br />
      <div className="px-4 sm:px-12">
        <hr
          style={{
            borderColor: "#6c8fa3",
            color: "black",
            background: "black",
          }}
        />
      </div>
      <br />
      <div>
        <div className="container flex justify-center">
          <h4></h4>
          <div className="flex items-center gap-2">
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "40px",
                overflow: "hidden",
              }}
            >
              <img
                src={WDC}
                style={{ width: "80px", height: "80px" }}
                alt="WDC logo"
              />
            </div>
            <div>
              <p className=" font-bold">World Disaster Center</p>
              <ul>
                <li className="text-gray-400">
                  New York 1660 Madison Avenue, New York, NY, 10029
                </li>
                <li className="text-gray-400">
                  Austria 5020, Wolf-Dietrich Strabe 31
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="container flex flex-wrap justify-around gap-6 px-4">
        <div>
          <br />
          <br />
          <h3 className="font-bold underline" style={{ marginBottom: "6px" }}>
            About Us
          </h3>
          <ul style={{ listStyle: "bullet" }}>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/about">
                Who we are
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/about/vision">
                Our Vision
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/about/values">
                Our Values
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/about/mission">
                Our Mission
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/about/careers">
                Careers
              </Link>
            </li>

          </ul>
        </div>

        <div>
          <br />
          <br />
          <h3 className="font-bold underline" style={{ marginBottom: "6px" }}>
            Pages
          </h3>
          <ul style={{ listStyle: "bullet" }}>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/">
                Acceuil
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/donate">
                Donate
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/team">
                Team
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/blogs">
                Blogs
              </Link>
            </li>
            <li style={{ marginBottom: "4px" }}>
              <Link className="text-gray-400" to="/contact">
                Contact us
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <br />
      <div className="container flex sm:justify-between justify-center items-center gap-4 sm:gap-8 flex-col sm:flex-row text-center sm:text-left">
        <div className="flex justify-center">
          <a href="mailto:office@worlddisastercenter.org">
            office@worlddisastercenter.org
          </a>
        </div>
        <p className="caption text-n-4 lg:block">
        Copyright © {new Date().getFullYear()}. All Rights Reserved.
        </p>

        <ul className="flex gap-5 flex-wrap">
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.url}
              target="_blank"
              className="flex items-center justify-center w-10 h-10 bg-n-7 rounded-full transition-colors hover:bg-n-6"
            >
              <img src={item.iconUrl} width={16} height={16} alt={item.title} />
            </a>
          ))}
        </ul>
      </div>
    </Section>
  );
};

export default Footer;
