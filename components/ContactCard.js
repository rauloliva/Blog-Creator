import { icons } from "../utils";
import Link from "next/link";
import Image from "next/image";

const ContactCard = ({ href, icon, title, paragraph }) => (
  <Link href={href} passHref>
    <div className="contact__info">
      <Image src={icons[icon]} width="100" height="100" alt={`${icon} Icon`} />

      <div className="contact__info-text">
        <h3 className="contact__info-title">{title}</h3>
        <p className="contact__info-paragraph">{paragraph}</p>
      </div>
    </div>
  </Link>
);

export default ContactCard;
