import { icons } from "../utils";
import Image from "next/image";

const ContactCard = ({ href, icon, title, paragraph }) => (
  <a href={href} target="_blank" rel="noreferrer">
    <div className="contact__info" target="_blank">
      <Image src={icons[icon]} width="100" height="100" alt={`${icon} Icon`} />

      <div className="contact__info-text">
        <h3 className="contact__info-title">
          {title}

          <Image
            src="https://img.icons8.com/ios-glyphs/20/7fc8a9/external-link.png"
            width="20"
            height="20"
            alt=""
          />
        </h3>
        <p className="contact__info-paragraph">{paragraph}</p>
      </div>
    </div>
  </a>
);

export default ContactCard;
